import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../assets/icons/search.svg';
import { useDeviceData } from '@/contexts/deviceData';
import { useFilters } from '@/contexts/filters';
import Link from 'next/link';
import { Device } from '@/constants/types';

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
  const { deviceData } = useDeviceData();

  const isDropdownVisible = Boolean(inputValue);

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
            defaultValue={inputValue}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                e.preventDefault();
                e.currentTarget.blur();
                setSearchTerm(inputValue);
              }
            }}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
        </div>
      </div>
      <div
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
