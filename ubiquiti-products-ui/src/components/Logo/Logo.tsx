import React, { MouseEventHandler } from 'react';
import styles from './Logo.module.css';

interface Props {
  logoPath: string;
  altText: string;
  onClickEffect: (event: { view: { location: { pathname: string } } }) => void;
}

const Logo = ({ logoPath, altText, onClickEffect }: Props) => {
  return (
    <button
      type="button"
      className={`${styles.logo} generalFocus generalTransition`}
      onClick={onClickEffect as unknown as MouseEventHandler<HTMLButtonElement>}
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
