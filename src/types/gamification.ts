export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  level: number;
  xp: number;
  rank: string;
  joinedAt: string;
}

export const XP_TABLE = {
  TOPIC_COMPLETE: 50,
  TOPIC_REVISED: 100,
  ANSWER_SUBMITTED: 150,
  STREAK_BONUS: 200,
};

export const RANKS = [
  { level: 1, name: "Aspirant", xpRequired: 0 },
  { level: 5, name: "Serious Candidate", xpRequired: 1000 },
  { level: 10, name: "Officer in Making", xpRequired: 5000 },
  { level: 20, name: "District Collector", xpRequired: 20000 },
];
