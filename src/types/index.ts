import { ReactNode } from "react";

export interface IParent {
  children: ReactNode;
}

export interface IImage {
  src: string;
  alt: string;
}

export interface IChallengeCtx {
  challenges: Record<string, any>[];
  addChallenge: (challenge: Record<string, any>) => void;
  deleteChallenge: (challengeId: string) => void;
  updateChallengeStatus: (challengeId: string, newStatus: string) => void;
}
