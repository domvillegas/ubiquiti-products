import React from 'react';
import styles from './Button.module.css';

interface Props {
  variant?: 'cta' | 'outline';
  buttonText: string;
  buttonEffect: () => void;
  className?: string;
}

const Button = ({
  buttonText,
  buttonEffect,
  variant = 'cta',
  className,
}: Props) => {
  return (
    <button
      type="button"
      onClick={buttonEffect}
      className={`${styles.button} ${styles[variant]} ${className} generalFocus`}
    >
      {buttonText}
    </button>
  );
};

export default Button;
