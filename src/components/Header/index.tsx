import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

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
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>
      <header className={classes.mainHeader}>
        <h1>Your Challenges</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, mass: .7 }}
          onClick={handleStartAddNewChallenge}
          className={classes.button}
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}
