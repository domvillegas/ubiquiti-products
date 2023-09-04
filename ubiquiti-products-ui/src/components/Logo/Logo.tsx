import React from 'react';
import styles from './Logo.module.css';

interface Props {
  logoPath: string;
  altText: string;
  onClickEffect: () => void;
}

const Logo = ({ logoPath, altText, onClickEffect }: Props) => {
  return (
    <button
      type="button"
      className={`${styles.logo} generalFocus generalTransition`}
      onClick={onClickEffect}
    >
      <img
        className="generalTransition"
        src={logoPath as string}
        alt={altText as string}
      />
    </button>
  );
};

export default Logo;
