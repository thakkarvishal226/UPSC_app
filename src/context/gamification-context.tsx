"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, RANKS } from "@/types/gamification";
import { useAuth } from "@/context/auth-context";
import { doc, onSnapshot, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface GamificationContextType {
  profile: UserProfile | null;
  addXP: (amount: number) => Promise<void>;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().profile) {
        setProfile(docSnap.data().profile);
      } else {
        // Initialize profile
        const initialProfile: UserProfile = {
          uid: user.uid,
          displayName: user.displayName || "Aspirant",
          email: user.email || "",
          level: 1,
          xp: 0,
          rank: "Aspirant",
          joinedAt: new Date().toISOString(),
        };
        setDoc(userRef, { profile: initialProfile }, { merge: true });
        setProfile(initialProfile);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const addXP = async (amount: number) => {
    if (!user || !profile) return;

    const newXP = profile.xp + amount;
    let newLevel = profile.level;
    let newRank = profile.rank;

    // Simple level calculation: 1 level per 500 XP
    newLevel = Math.floor(newXP / 500) + 1;

    // Determine Rank
    const rankObj = RANKS.slice().reverse().find(r => newXP >= r.xpRequired);
    if (rankObj) newRank = rankObj.name;

    try {
       await updateDoc(doc(db, "users", user.uid), {
         "profile.xp": increment(amount),
         "profile.level": newLevel,
         "profile.rank": newRank
       });
    } catch (e) {
        console.error("Error updating XP", e);
    }
  };

  return (
    <GamificationContext.Provider value={{ profile, addXP }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider");
  }
  return context;
}
