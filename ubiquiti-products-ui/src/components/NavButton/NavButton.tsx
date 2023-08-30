import React from 'react';
import styles from './NavButton.module.css';
import arrow from '../../assets/icons/arrow.svg';

interface Props {
  direction: 'forward' | 'back';
  buttonText?: string;
  clickEffect: () => void;
}

const NavButton = ({ direction, buttonText, clickEffect }: Props) => {
  return (
    <div
      className={`shadow generalTransition ${styles.navButton} ${
        buttonText ? styles.withButtonText : ''
      }`}
      onClick={clickEffect}
    >
      <img
        className={direction === 'forward' ? '' : styles.backArrow}
        src={arrow.src}
        alt={`${direction} arrow`}
        aria-label={direction}
      />
      {buttonText ? <span className={`${styles.buttonText} body2`}>{buttonText}</span> : ''}
    </div>
  );
};

export default NavButton;
