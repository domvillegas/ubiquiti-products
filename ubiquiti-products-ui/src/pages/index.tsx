import React, { useContext, useEffect, useState } from 'react';
import Table from '@/components/Table/Table';
import styles from './index.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';
import Link from 'next/link';
import { useResultsLayout } from '@/contexts/display';
import { useDeviceData } from '@/contexts/deviceData';
import { useFilters } from '@/contexts/filters';

const IndexPage = () => {
  const { deviceData } = useDeviceData();
  const { deviceDisplay } = useResultsLayout();
  const { results: filteredDevices } = useFilters();

  //TODO: componentize rows?
  const rows = () =>
    filteredDevices.map((row) => {
      const largestResolution =
        row.icon.resolutions[row.icon.resolutions.length - 1];

      return (
        <Link
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

  const productCardGrid = productCardData?.map((data) => {
    return (
      <Link
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
    <div className={styles.deviceList}>
      <span className="body2">
        {((filteredDevices?.length && filteredDevices) || deviceData)?.length}{' '}
        Results
      </span>
      {deviceDisplay === 'list' ? (
        <Table rows={rows()} />
      ) : (
        <div className={styles.productCardGrid}>{productCardGrid}</div>
      )}
    </div>
  );
};

export default IndexPage;
