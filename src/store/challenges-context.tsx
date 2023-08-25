import { createContext, useState, useContext } from 'react';

import { IParent, IChallengeCtx } from "../types";

export const ChallengesContext = createContext<IChallengeCtx | null>(null);

export default function ChallengesContextProvider({ children }: IParent) {
  const [challenges, setChallenges] = useState<Record<string, any>[]>([]);

  function addChallenge(challenge: Record<string, any>) {
    setChallenges((prevChallenges) => [
      { ...challenge, id: Math.random().toString(), status: 'active' },
      ...prevChallenges,
    ]);
  }

  function deleteChallenge(challengeId: string) {
    setChallenges((prevChallenges) =>
      prevChallenges.filter((challenge) => challenge.id !== challengeId)
    );
  }

  function updateChallengeStatus(challengeId: string, newStatus: string) {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return { ...challenge, status: newStatus };
        }
        return challenge;
      })
    );
  }

  const challengesContext: IChallengeCtx = {
    challenges,
    addChallenge,
    deleteChallenge,
    updateChallengeStatus,
  };

  return (
    <ChallengesContext.Provider value={challengesContext}>
      {children}
    </ChallengesContext.Provider>
  );
}

export const useChallengeContext = () => {
  const ctx = useContext(ChallengesContext);

  if (!ctx) {
    throw new Error("No context found! Check your Context Provider scope.")
  }

  return ctx;
}

