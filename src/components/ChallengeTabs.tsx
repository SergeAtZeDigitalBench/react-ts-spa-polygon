import { IParent } from "../types";
import Badge from './Badge.js';

interface ITabProps extends IParent { isSelected: boolean, onSelect: (...args: any[]) => void, badgeCaption: string | number, }

function Tab({ isSelected, onSelect, badgeCaption, children }: ITabProps) {
  return (
    <li>
      <button
        className={isSelected ? 'selected' : undefined}
        onClick={onSelect}
      >
        {children}
        <Badge caption={badgeCaption}></Badge>
      </button>
      {isSelected && <div className="active-tab-indicator" />}
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
      <menu id="tabs">
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
