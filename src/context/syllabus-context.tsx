"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { SyllabusTopic, INITIAL_SYLLABUS, TopicStatus } from "@/types/syllabus";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/auth-context";

interface SyllabusContextType {
  syllabus: SyllabusTopic[];
  updateStatus: (topicId: string, status: TopicStatus) => void;
  getTopicById: (id: string) => SyllabusTopic | undefined;
  getProgress: () => { total: number; completed: number; percentage: number };
  getPendingTasks: (limit?: number) => SyllabusTopic[];
  getDueRevisions: () => SyllabusTopic[];
}

const SyllabusContext = createContext<SyllabusContextType | undefined>(undefined);

export function SyllabusProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [syllabus, setSyllabus] = useState<SyllabusTopic[]>(INITIAL_SYLLABUS);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().syllabus) {
        setSyllabus(docSnap.data().syllabus);
      } else {
        // Initialize if not exists
        setDoc(userRef, { syllabus: INITIAL_SYLLABUS }, { merge: true });
      }
    });

    return () => unsubscribe();
  }, [user]);

  const saveSyllabus = async (newSyllabus: SyllabusTopic[]) => {
    if (!user) return;
    try {
       await setDoc(doc(db, "users", user.uid), { syllabus: newSyllabus }, { merge: true });
    } catch (e) {
        console.error("Error saving syllabus to Firestore", e);
    }
  };

  const updateStatus = (topicId: string, status: TopicStatus) => {
    const updateRecursive = (topics: SyllabusTopic[]): SyllabusTopic[] => {
      return topics.map((topic) => {
        if (topic.id === topicId) {
          const now = new Date();
          let nextRevisionDate = topic.nextRevisionDate;
          let revisionCount = topic.revisionCount || 0;

          if (status === "Completed" && topic.status !== "Completed") {
            // First time completion: Schedule revision for tomorrow (1 day)
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            nextRevisionDate = tomorrow.toISOString();
            revisionCount = 0;
          } else if (status === "Revised") {
            // Completed a revision
            revisionCount += 1;
            const nextDate = new Date(now);
            // 1 -> 7 days, 2 -> 30 days, 3+ -> 60 days
            if (revisionCount === 1) nextDate.setDate(nextDate.getDate() + 7);
            else if (revisionCount === 2) nextDate.setDate(nextDate.getDate() + 30);
            else nextDate.setDate(nextDate.getDate() + 60);

            nextRevisionDate = nextDate.toISOString();
          }

          return {
            ...topic,
            status,
            lastRevised: (status === "Completed" || status === "Revised") ? now.toISOString() : topic.lastRevised,
            nextRevisionDate,
            revisionCount
          };
        }
        if (topic.subtopics) {
          return { ...topic, subtopics: updateRecursive(topic.subtopics) };
        }
        return topic;
      });
    };
    const newSyllabus = updateRecursive(syllabus);
    // Optimistic update
    setSyllabus(newSyllabus);
    // Save to Firestore
    saveSyllabus(newSyllabus);
  };

  const getTopicById = (id: string): SyllabusTopic | undefined => {
    const findRecursive = (topics: SyllabusTopic[]): SyllabusTopic | undefined => {
      for (const topic of topics) {
        if (topic.id === id) return topic;
        if (topic.subtopics) {
          const found = findRecursive(topic.subtopics);
          if (found) return found;
        }
      }
      return undefined;
    };
    return findRecursive(syllabus);
  };

  const getProgress = () => {
    let total = 0;
    let completed = 0;

    const countRecursive = (topics: SyllabusTopic[]) => {
      topics.forEach((topic) => {
        if (!topic.subtopics || topic.subtopics.length === 0) {
          total++;
          if (topic.status === "Completed" || topic.status === "Revised") {
            completed++;
          }
        } else {
            countRecursive(topic.subtopics);
        }
      });
    };

    countRecursive(syllabus);
    return { total, completed, percentage: total === 0 ? 0 : Math.round((completed / total) * 100) };
  };

  const getPendingTasks = (limit: number = 3): SyllabusTopic[] => {
    const pending: SyllabusTopic[] = [];

    const findRecursive = (topics: SyllabusTopic[]) => {
      if (pending.length >= limit) return;

      for (const topic of topics) {
        if (pending.length >= limit) return;

        if ((!topic.subtopics || topic.subtopics.length === 0) && (topic.status === "Not Started" || topic.status === "In Progress")) {
          pending.push(topic);
        }

        if (topic.subtopics) {
          findRecursive(topic.subtopics);
        }
      }
    };

    findRecursive(syllabus);
    return pending;
  };

  const getDueRevisions = (): SyllabusTopic[] => {
    const due: SyllabusTopic[] = [];
    const now = new Date();

    const findRecursive = (topics: SyllabusTopic[]) => {
      for (const topic of topics) {
        if (topic.nextRevisionDate && new Date(topic.nextRevisionDate) <= now) {
           due.push(topic);
        }
        if (topic.subtopics) {
          findRecursive(topic.subtopics);
        }
      }
    };
    findRecursive(syllabus);
    return due;
  };

  return (
    <SyllabusContext.Provider value={{ syllabus, updateStatus, getTopicById, getProgress, getPendingTasks, getDueRevisions }}>
      {children}
    </SyllabusContext.Provider>
  );
}

export function useSyllabus() {
  const context = useContext(SyllabusContext);
  if (context === undefined) {
    throw new Error("useSyllabus must be used within a SyllabusProvider");
  }
  return context;
}
