import React from 'react';
import Table from '@/components/Table/Table';
import styles from './index.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';
import Link from 'next/link';
import { useResultsLayout } from '@/contexts/display';
import { useFilters } from '@/contexts/filters';
import Button from '@/components/Button/Button';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const { deviceDisplay } = useResultsLayout();
  const { results: filteredDevices, setSearchTerm } = useFilters();

  //TODO: componentize rows?
  const rows = () =>
    filteredDevices.map((row, index) => {
      const largestResolution =
        row.icon.resolutions[row.icon.resolutions.length - 1];

      return (
        <Link
          key={index}
          className={styles.rowWrap}
          href={{
            pathname: '/devices/[deviceId]/[width]/[height]',
            query: {
              deviceId: row.icon.id,
              width: largestResolution?.[0],
              height: largestResolution?.[1],
            },
          }}
        >
          <div className={styles.row}>
            <img
              src={`https://static.ui.com/fingerprint/ui/icons/${row.icon.id}_${row.icon.resolutions[0]?.[0]}x${row.icon.resolutions[0]?.[1]}.png`}
              alt={row.product.name}
            />
            <div className={styles.rowData}>
              <div className="body1">{row.line.name}</div>
              <div className="body2">{row.product.name}</div>
            </div>
          </div>
        </Link>
      );
    });

  const productCardData = filteredDevices.map((product) => {
    const largestResolution =
      product.icon.resolutions[product.icon.resolutions.length - 1];

    return {
      productIconId: product.icon.id,
      largestIconResolution: largestResolution,
      productName: product.product.name,
      line: product.line.name,
      shortnames: product.shortnames,
      imagePath: `https://static.ui.com/fingerprint/ui/icons/${product.icon.id}_${product.icon.resolutions[2]?.[0]}x${product.icon.resolutions[2]?.[1]}.png`,
    };
  });

  const productCardGrid = productCardData?.map((data, index) => {
    return (
      <Link
        key={index}
        className={styles.productCardWrap}
        href={{
          pathname: '/devices/[deviceId]/[width]/[height]',
          query: {
            deviceId: data.productIconId,
            width: data.largestIconResolution[0],
            height: data.largestIconResolution[1],
          },
        }}
      >
        <ProductCard productData={data} />
      </Link>
    );
  });

  return (
    <>
      {/* If there are search results return either a list of results or a grid of results */}
      {filteredDevices.length ? (
        <div className={styles.deviceList}>
          {deviceDisplay === 'list' ? (
            <Table rows={rows()} />
          ) : (
            <div className={styles.productCardGrid}>{productCardGrid}</div>
          )}
        </div>
      ) : (
        <div className={styles.noResults}>
          <h3>No Results</h3>{' '}
          <Button buttonText="Refresh" buttonEffect={() => setSearchTerm('')} />
        </div>
      )}
    </>
  );
};

export default IndexPage;
