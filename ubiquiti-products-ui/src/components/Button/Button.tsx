import React from 'react';
import styles from './Button.module.css';

interface Props {
  variant?: 'cta';
  buttonText: string;
  buttonEffect: () => void;
}

const Button = ({ buttonText, buttonEffect, variant = 'cta' }: Props) => {
  return (
    <button
      type="button"
      onClick={buttonEffect}
      className={`${styles.button} ${styles[variant]} generalFocus`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
