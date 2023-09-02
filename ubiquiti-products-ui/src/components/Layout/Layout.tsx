import React, { ReactNode, useContext, useState } from 'react';
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
import { useRouter } from 'next/router';
import Loader from '../Loader/Loader';
import { useResultsLayout } from '@/contexts/display';
import { useDeviceData } from '@/contexts/deviceData';
import { useFilters } from '@/contexts/filters';
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
  const { deviceData } = useDeviceData();
  const { deviceDisplay, setDeviceDisplay } = useResultsLayout();
  const { results } = useFilters();

  const searchIndex = deviceData?.map((device) => {
    return {
      item: device.product.name,
      lineText: device.line.name,
      iconId: device.icon.id,
      iconResolutions: device.icon.resolutions,
    };
  });

  const rawFilterOptions = deviceData?.map((device) => {
    return device.line.name;
  });

  const filterOptions = [...new Set(rawFilterOptions)];

  const router = useRouter();

  const logoClickHandler = (event) => {
    if (event.view.location.pathname === '/') {
      router.reload();
    } else {
      router.push('/');
    }
  };

  return (
    <div className={inter.className}>
      <div className={styles.header}>
        <div className={styles.topSection}>
          <div className={styles.logoSection}>
            <Logo
              logoPath={ubiquitiLogo.src}
              altText="Ubiquiti Logo"
              onClickEffect={logoClickHandler}
            />

            <span className="body2">Devices</span>
          </div>
          <span className="body2">Dominick Villegas &#128516;</span>
        </div>
        {router.pathname === '/' && (
          <>
            <div className={styles.searchTools}>
              <div className={styles.searchBar}>
                <div>
                  <SearchBar
                    placeholder="Search All Devices"
                    searchIndex={searchIndex}
                  />
                </div>
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

            <div className={styles.resultsCountContainer}>
              <span className="body2">{results.length} Results</span>
            </div>

            {deviceDisplay === 'list' && (
              <div className={styles.tableLabels}>
                <div className={styles.emptyDiv} />
                <span className="bold">Product Line</span>
                <span className="bold">Name</span>
              </div>
            )}
          </>
        )}
      </div>
      <div>{children}</div>
      {!deviceData?.length && <Loader />}
    </div>
  );
};

export default Layout;
