import { useState } from 'react';

import NewChallenge from '../NewChallenge';

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState<boolean>(false);

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}

      <header className="mainHeader">
        <h1>Your Challenges</h1>
        <button onClick={handleStartAddNewChallenge} className="button">
          Add Challenge
        </button>
      </header>
    </>
  );
}
