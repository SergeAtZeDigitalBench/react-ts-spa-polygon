import React from 'react'
import classnames from 'classnames'
import { useChallengeContext } from '../../store/challenges-context';
import classes from './ChallengeItem.module.css'

interface IProps {
    [x: string]: any;
}

const ChallengeItem = ({
    challenge,
    onViewDetails,
    isExpanded,
}: IProps) => {
    const { updateChallengeStatus } = useChallengeContext()

    const formattedDate = new Date(challenge.deadline).toLocaleDateString(
        'en-US',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }
    );

    function handleCancel() {
        updateChallengeStatus(challenge.id, 'failed');
    }

    function handleComplete() {
        updateChallengeStatus(challenge.id, 'completed');
    }

    return (
        <li>
            <article className="challengeItem">
                <header>
                    <img {...challenge.image} />
                    <div className="challengeItemMeta">
                        <h2>{challenge.title}</h2>
                        <p>Complete until {formattedDate}</p>
                        <p className="challengeItemActions">
                            <button onClick={handleCancel} className="btnNegative">
                                Mark as failed
                            </button>
                            <button onClick={handleComplete}>Mark as completed</button>
                        </p>
                    </div>
                </header>
                <div className={classnames("challengeItemDetails", isExpanded && "expanded")}>
                    <p>
                        <button onClick={onViewDetails}>
                            View Details{' '}
                            <span className="challengeItemDetailsIcon">&#9650;</span>
                        </button>
                    </p>

                    {isExpanded && (
                        <div>
                            <p className="challengeItemDescription">
                                {challenge.description}
                            </p>
                        </div>
                    )}
                </div>
            </article>
        </li>
    );
}

export default ChallengeItem