import React from "react";
import { useChallengeContext } from "@/store/challenges-context";
import { motion } from "framer-motion";
import classes from "./ChallengeItem.module.css";

interface IProps {
  [x: string]: any;
}

const ChallengeItem = ({ challenge, onViewDetails, isExpanded }: IProps) => {
  const { updateChallengeStatus } = useChallengeContext();

  const formattedDate = new Date(challenge.deadline).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  function handleCancel() {
    updateChallengeStatus(challenge.id, "failed");
  }

  function handleComplete() {
    updateChallengeStatus(challenge.id, "completed");
  }

  return (
    <li>
      <article className={classes.challengeItem}>
        <header>
          <img {...challenge.image} />
          <div className={classes.challengeItemMeta}>
            <h2>{challenge.title}</h2>
            <p>Complete until {formattedDate}</p>
            <p className={classes.challengeItemActions}>
              <button onClick={handleCancel} className={classes.btnNegative}>
                Mark as failed
              </button>
              <button onClick={handleComplete}>Mark as completed</button>
            </p>
          </div>
        </header>
        <div
          className={classes.challengeItemDetails}
        >
          <p>
            <button onClick={onViewDetails}>
              View Details{" "}
              <motion.span className={classes.challengeItemDetailsIcon} animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: .3 }}>&#9650;</motion.span>
            </button>
          </p>

          {isExpanded && (
            <div>
              <p className={classes.challengeItemDescription}>
                {challenge.description}
              </p>
            </div>
          )}
        </div>
      </article>
    </li>
  );
};

export default ChallengeItem;
