import { useState } from 'react';

import { useChallengeContext } from '../../store/challenges-context';
import ChallengeItem from '../ChallengeItem';
import ChallengeTabs from '../ChallengeTabs';
import classes from './Challenges.module.css'

export default function Challenges() {
  const { challenges } = useChallengeContext();
  const [selectedType, setSelectedType] = useState('active');
  const [expanded, setExpanded] = useState<null | string>(null);

  function handleSelectType(newType: string) {
    setSelectedType(newType);
  }

  function handleViewDetails(id: string) {
    setExpanded((prevId) => {
      if (prevId === id) {
        return null;
      }

      return id;
    });
  }

  const filteredChallenges: Record<string, Record<string, any>[]> = {
    active: challenges.filter((challenge) => challenge.status === 'active'),
    completed: challenges.filter(
      (challenge) => challenge.status === 'completed'
    ),
    failed: challenges.filter((challenge) => challenge.status === 'failed'),
  };

  const displayedChallenges = filteredChallenges[selectedType];

  return (
    <div className={classes.challenges}>
      <ChallengeTabs
        challenges={filteredChallenges}
        onSelectType={handleSelectType}
        selectedType={selectedType}
      >
        {displayedChallenges.length > 0 && (
          <ol className={classes.challengeItems}>
            {displayedChallenges.map((challenge) => (
              <ChallengeItem
                key={challenge.id}
                challenge={challenge}
                onViewDetails={() => handleViewDetails(challenge.id)}
                isExpanded={expanded === challenge.id}
              />
            ))}
          </ol>
        )}
        {displayedChallenges.length === 0 && <p>No challenges found.</p>}
      </ChallengeTabs>
    </div>
  );
}
