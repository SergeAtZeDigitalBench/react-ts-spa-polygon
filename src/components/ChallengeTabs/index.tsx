import { IParent } from "../../types";
import Badge from '../Badge';
import classes from './ChallengeTabs.module.css'

interface ITabProps extends IParent { isSelected: boolean, onSelect: (...args: any[]) => void, badgeCaption: string | number, }

function Tab({ isSelected, onSelect, badgeCaption, children }: ITabProps) {
  return (
    <li>
      <button
        className={isSelected ? classes.selected : undefined}
        onClick={onSelect}
      >
        {children}
        <Badge caption={badgeCaption}></Badge>
      </button>
      {isSelected && <div className={classes.activeTabIndicator} />}
    </li>
  );
}

interface IChallengeProps extends IParent {
  selectedType: string
  onSelectType: (...args: any[]) => void;
  challenges: Record<string, Record<string, any>[]>
}
export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}: IChallengeProps) {
  return (
    <>
      <menu className={classes.tabs}>
        <Tab
          isSelected={selectedType === 'active'}
          onSelect={() => onSelectType('active')}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === 'completed'}
          onSelect={() => onSelectType('completed')}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === 'failed'}
          onSelect={() => onSelectType('failed')}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}
