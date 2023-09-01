import React from 'react';
import ubiquitiLogo from '../../assets/logos/ubiquiti.svg';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img
        className={styles.rotate}
        src={ubiquitiLogo.src}
        alt="Ubiquiti Logo"
      />
    </div>
  );
};

export default Loader;
