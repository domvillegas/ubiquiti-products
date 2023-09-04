import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  id?: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  className,
}: CheckboxProps) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`${styles.checkbox} ${
        className ? className : ''
      } generalFocus`}
      tabIndex={0}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        //onChange required by React, but we are handling this need on the input's parent div
        onChange={() => ''}
      ></input>
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
