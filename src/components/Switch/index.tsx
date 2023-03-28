import React from "react";

import styles from "./Switch.module.css";

const SWITCH_ID = "react-switch-new";

interface IProps {
  isOn: boolean;
  handleToggle: () => void;
}

const Switch = ({ isOn, handleToggle }: IProps): JSX.Element => {
  return (
    <>
      <input
        className={styles.SwitchCheckbox}
        id={SWITCH_ID}
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
      />
      <label className={styles.SwitchLabel} htmlFor={SWITCH_ID}>
        <span className={styles.SwitchButton} />
      </label>
    </>
  );
};

export default Switch;
