import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import styles from './Filter.module.css';
import { useFilters } from '@/contexts/filters';

interface Props {
  isActive: boolean;
  filterName: string;
  filterOptions: string[];
}

const Filter = ({ isActive, filterName, filterOptions }: Props) => {
  const { keywords, setKeywords } = useFilters();

  const handleCheck = (label: string) => {
    if (!label.length) return;

    if (keywords.includes(label)) {
      setKeywords(
        keywords.filter((filter) => {
          return filter !== label;
        }),
      );
    } else {
      setKeywords([...keywords, label]);
    }
  };

  return (
    <div
      className={`shadow ${
        isActive ? styles.dropdownRevealed : styles.dropdownHidden
      } ${styles.filter}`}
    >
      <span className={`bold ${styles.filterName}`}>{filterName}</span>
      <div className={styles.checkBoxesContainer}>
        {filterOptions.map((option, index) => {
          return (
            <Checkbox
              className={styles.checkBox}
              key={index}
              label={option}
              checked={keywords.includes(option)}
              onChange={(checked) => handleCheck(option)}
            />
          );
        })}
      </div>
      <div className={styles.blurFilter} />
      <button
        className="generalTransition"
        disabled={!Boolean(keywords.length)}
        type="button"
        onClick={() => setKeywords([])}
      >
        Reset
      </button>
    </div>
  );
};

export default Filter;
