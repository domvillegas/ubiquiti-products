import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Logo from '../Logo/Logo';
import ubiquitiLogo from '../../assets/logos/ubiquiti.svg';
import styles from './Layout.module.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SearchBar from '../SearchBar/SearchBar';
import ProductsDisplayOption from '../ProductsDisplayOption/ProductsDisplayOption';
import listIcon from '../../assets/icons/list.svg';
import gridIcon from '../../assets/icons/grid.svg';
import Filter from '../Filter/Filter';
import { DeviceData } from '@/constants/types';
import {
  DeviceDataContext,
  DeviceDisplayContext,
  FilteredDevicesContext,
} from '@/contexts/contexts';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Ubiquiti Products UI',
};

const Layout = ({ children }: Props) => {
  const [filterIsActive, setFilterIsActive] = useState(false);
  const { deviceData, setDeviceData } = useContext(DeviceDataContext);
  const { deviceDisplay, setDeviceDisplay } = useContext(DeviceDisplayContext);
  const { filteredDevices, setFilteredDevices } = useContext(
    FilteredDevicesContext,
  );

  const searchIndex = deviceData?.map(
    // improve this type
    (device: any) => {
      return { item: device.product.name, lineText: device.line.name };
    },
  );

  //improve this type
  const rawFilterOptions = deviceData?.map((device: any) => {
    return device.line.name;
  });

  const filterOptions = [...new Set(rawFilterOptions)];

  return (
    <div className={inter.className}>
      <div className={styles.header}>
        <div className={styles.topSection}>
          <div className={styles.logoSection}>
            <Logo
              logoPath={ubiquitiLogo.src}
              altText="Ubiquiti Logo"
              onClickEffect={() => console.log('Placeholder effect')}
            />
            <span className="body2">Devices</span>
          </div>
          <span className="body2">Dominick Villegas &#128516;</span>
        </div>
        <div className={styles.searchTools}>
          <div className={styles.searchBar}>
            <div>
              <SearchBar placeholder="Search" searchIndex={searchIndex} />
            </div>
            <span className="body2">
              {
                ((filteredDevices?.length && filteredDevices) || deviceData)
                  ?.length
              }{' '}
              Devices
            </span>
            <Link
              href={{
                pathname: '/[deviceID]/device',
                query: { deviceID: '1234' },
              }}
            >
              click me
            </Link>
          </div>
          <div className={styles.productsDisplayOptions}>
            <ProductsDisplayOption
              iconPath={listIcon.src}
              iconAltText="List Icon"
              optionEffect={() => setDeviceDisplay('list')}
            />
            <ProductsDisplayOption
              iconPath={gridIcon.src}
              iconAltText="Grid Icon"
              optionEffect={() => setDeviceDisplay('grid')}
            />
            <div className={styles.filterOptionsContainer}>
              <ProductsDisplayOption
                optionName="Filter"
                optionEffect={() => setFilterIsActive(!filterIsActive)}
              />
              <Filter
                isActive={filterIsActive}
                filterName="Product Line"
                filterOptions={filterOptions}
              />
            </div>
          </div>
        </div>
        {deviceDisplay === 'list' && (
          <div className={styles.tableLabels}>
            <div className={styles.emptyDiv} />
            <span className="bold">Product Line</span>
            <span className="bold">Name</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Layout;