import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../assets/icons/search.svg';
import { useFilters } from '@/contexts/filters';
import Link from 'next/link';

interface Props {
  placeholder: string;
  searchIndex:
    | {
        item: string;
        lineText: string;
        iconId: string;
        iconResolutions: number[][];
      }[]
    | undefined;
}

const SearchBar = ({ placeholder, searchIndex }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const { setSearchTerm } = useFilters();
  const [clickedAway, setClickedAway] = useState(false);

  const searchBarRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDropdownVisible = Boolean(inputValue) && !clickedAway;

  const closeDropdown = ({ target }: MouseEvent) => {
    if (
      dropdownRef.current &&
      searchBarRef.current &&
      !dropdownRef.current.contains(target as Node) &&
      !searchBarRef.current.contains(target as Node)
    ) {
      setClickedAway(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeDropdown);
  }, []);

  const dropdownItemsArray = searchIndex?.filter((item) => {
    const searchValueLength = inputValue.length;
    const itemSegment = item.item.substring(0, searchValueLength);
    if (
      itemSegment
        .toLowerCase()
        .includes(inputValue.toLowerCase().substring(0, searchValueLength))
    ) {
      return item;
    }
  });

  const dropdownItems = dropdownItemsArray?.map((item, index) => {
    const largestIconResolution = item.iconResolutions.length - 1;
    return (
      <Link
        key={index}
        className={styles.nextLink}
        href={{
          pathname: '/devices/[deviceId]/[width]/[height]',
          query: {
            deviceId: item.iconId,
            width: item.iconResolutions[largestIconResolution][0],
            height: item.iconResolutions[largestIconResolution][1],
          },
        }}
      >
        <div className={styles.dropdownItem} tabIndex={0}>
          <div>
            <span className={`${styles.searchValue} bold`}>{inputValue}</span>
            <span className={`${styles.searchItem}} body1`}>
              {item?.item.substring(inputValue.length)}
            </span>
          </div>
          <span className="body2">{item.lineText}</span>
        </div>
      </Link>
    );
  });

  const noResults = (
    <div className={styles.noResults}>
      <span className={styles.searchValue}>{inputValue}</span>
      <span className={styles.noResultsText}>No Matches</span>
    </div>
  );

  return (
    <>
      <div
        ref={searchBarRef}
        className={styles.searchBar}
        onClick={() => setClickedAway(false)}
      >
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
            defaultValue={inputValue}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                e.preventDefault();
                e.currentTarget.blur();
                setSearchTerm(inputValue);
                setClickedAway(true);
              }
            }}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
        </div>
      </div>
      <div
        ref={dropdownRef}
        className={`${styles.dropdown} ${
          dropdownItems?.length ? styles.withItems : ''
        } ${
          isDropdownVisible ? styles.dropdownRevealed : styles.dropdownHidden
        } shadow`}
      >
        {dropdownItems?.length ? dropdownItems : noResults}
      </div>
      <div
        style={isDropdownVisible ? { display: 'block' } : { display: 'none' }}
        className={styles.blurFilter}
      />
    </>
  );
};

export default SearchBar;
