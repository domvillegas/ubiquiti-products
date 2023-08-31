import React, { useContext, useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import styles from './Filter.module.css';
import { FilteredDevicesContext, DeviceDataContext } from '@/contexts/contexts';

interface Props {
  isActive: boolean;
  filterName: string;
  filterOptions: string[];
}

const Filter = ({ isActive, filterName, filterOptions }: Props) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { setFilteredDevices } = useContext(
    FilteredDevicesContext,
  );
  const { deviceData } = useContext(DeviceDataContext);

  useEffect(() => {
    const filterResult = deviceData?.filter((device) => {
      return selectedFilters.includes(device.line.name);
    });

    setFilteredDevices(filterResult);
  }, [selectedFilters]);

  const checkboxEffectHandler = (event) => {
    if (
      event.target.innerText.length &&
      !selectedFilters.includes(event.target.innerText)
    ) {
      setSelectedFilters((oldSelection) => [
        ...oldSelection,
        event.target.innerText,
      ]);
    } else if (
      event.target.innerText.length &&
      selectedFilters.includes(event.target.innerText)
    ) {
      setSelectedFilters(
        selectedFilters.filter((filter) => {
          return filter !== event.target.innerText;
        }),
      );
    }
  };

  const resetHandler = () => {
    setSelectedFilters([]);
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
            //this use of indexes as keys is safe
            <Checkbox
              className={styles.checkBox}
              key={index}
              labelName={option}
              checkboxEffect={(event) => checkboxEffectHandler(event)}
            />
          );
        })}
      </div>
      <div className={styles.blurFilter} />
      <button type="button" onClick={resetHandler}>
        Reset
      </button>
    </div>
  );
};

export default Filter;
