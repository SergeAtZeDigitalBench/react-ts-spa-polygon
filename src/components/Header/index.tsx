import { useState } from 'react';

import NewChallenge from '../NewChallenge';
import classes from './Header.module.css'

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

      <header className={classes.mainHeader}>
        <h1>Your Challenges</h1>
        <button onClick={handleStartAddNewChallenge} className={classes.button}>
          Add Challenge
        </button>
      </header>
    </>
  );
}
