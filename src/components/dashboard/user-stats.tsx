"use client"

import { useGamification } from "@/context/gamification-context";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function UserStats() {
  const { profile } = useGamification();
  const { user } = useAuth();

  if (!profile) return null;

  // Calculate XP progress to next level
  const xpForNextLevel = profile.level * 500;
  const progress = (profile.xp / xpForNextLevel) * 100;

  return (
    <Card className="col-span-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-none shadow-lg mb-6">
      <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
             <Avatar className="h-24 w-24 border-4 border-white/20 shadow-xl">
                <AvatarImage src={user?.photoURL || ""} />
                <AvatarFallback className="text-2xl font-bold text-blue-600 bg-white">
                    {profile.displayName?.charAt(0)}
                </AvatarFallback>
             </Avatar>
             <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 font-bold rounded-full h-8 w-8 flex items-center justify-center border-2 border-white shadow-sm text-xs">
                {profile.level}
             </div>
        </div>

        <div className="flex-1 w-full text-center md:text-left space-y-2">
            <div>
                <h2 className="text-2xl font-bold">{profile.displayName}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100">
                    <Trophy className="h-4 w-4 text-yellow-300" />
                    <span className="font-medium">{profile.rank}</span>
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-blue-100">
                    <span>XP: {profile.xp} / {xpForNextLevel}</span>
                    <span>{Math.round(progress)}% to Level {profile.level + 1}</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/20"  />
                {/* Note: The Progress component uses `bg-primary` for the indicator.
                    We might need to override it or accept the default theme color.
                    For this specific dark card, custom CSS or a custom Progress variant would be ideal.
                    Currently it will show the primary theme color which is fine.
                */}
            </div>
        </div>

        <div className="flex gap-4 md:border-l md:border-white/10 md:pl-6">
            <div className="text-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 mb-1 mx-auto">
                    <Target className="h-5 w-5 text-green-300" />
                </div>
                <div className="text-xl font-bold">85%</div>
                <div className="text-xs text-blue-200">Accuracy</div>
            </div>
             <div className="text-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 mb-1 mx-auto">
                    <Star className="h-5 w-5 text-yellow-300" />
                </div>
                <div className="text-xl font-bold">12</div>
                <div className="text-xs text-blue-200">Badges</div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
