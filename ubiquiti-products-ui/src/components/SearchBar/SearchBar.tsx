import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../assets/icons/search.svg';

interface Props {
  placeholder: string;
  searchIndex: { item: string; lineText: string }[] | undefined;
}

const SearchBar = ({ placeholder, searchIndex }: Props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onChangeHandler = (event: { target: { value: string } }) => {
    if (event.target.value) {
      !isDropdownVisible ? setIsDropdownVisible(true) : null;
      setSearchValue(event.target.value);
    } else {
      setIsDropdownVisible(false);
    }
  };

  const dropdownItemsArray = searchIndex?.filter((item) => {
    if (item.item.toLowerCase().includes(searchValue.toLowerCase())) {
      return item;
    }
  });

  const dropdownItems = dropdownItemsArray?.map((item, index) => {
    if (index <= 2) {
      return (
        <div className={styles.dropdownItem} tabIndex={0}>
          <div>
            <span className={styles.searchValue}>{searchValue}</span>
            <span className={styles.searchItem}>
              {item?.item.substring(searchValue.length)}
            </span>
          </div>
          <span className='body2'>{item.lineText}</span>
        </div>
      );
    }
  });

  const noResults = (
    <div className={styles.noResults}>
      <span className={styles.searchValue}>{searchValue}</span>
      <span className={styles.noResultsText}>No Matches</span>
    </div>
  );

  return (
    <>
      <div className={styles.searchBar}>
        <img
          src={searchIcon.src}
          alt="Magnifying Glass"
          className={styles.magnifyingGlass}
        />
        <div className={styles.inputWrapper}>
          <input
            className="generalFocus"
            type="search"
            placeholder={placeholder}
            onChange={onChangeHandler}
          />
        </div>
      </div>
      <div
        className={`${styles.dropdown} ${dropdownItems?.length ? styles.withItems : ''} ${
          isDropdownVisible ? styles.dropdownRevealed : styles.dropdownHidden
        } shadow`}
      >
        {dropdownItems?.length ? dropdownItems : noResults}
      </div>
    </>
  );
};

export default SearchBar;
