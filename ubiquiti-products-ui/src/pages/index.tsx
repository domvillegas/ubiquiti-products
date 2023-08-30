import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/components/Layout/Layout';
import {
  DeviceDataContext,
  DeviceDisplayContext,
  FilteredDevicesContext,
} from '@/contexts/contexts';
import Table from '@/components/Table/Table';
import styles from './index.module.css';
import ProductCard from '@/components/ProductCard/ProductCard';

const DeviceList = () => {
  const { deviceData, setDeviceData } = useContext(DeviceDataContext);
  const { deviceDisplay, setDeviceDisplay } = useContext(DeviceDisplayContext);
  const { filteredDevices, setFilteredDevices } = useContext(
    FilteredDevicesContext,
  );

  useEffect(() => {
    fetch('https://static.ui.com/fingerprint/ui/public.json')
      .then((response) => response.json())
      .then((data) => setDeviceData(data.devices));
  }, []);

  const rows = () =>
    ((filteredDevices?.length && filteredDevices) || deviceData)?.map(
      //improve this type
      (row: any) => (
        <div className={styles.row}>
          <img
            src={`https://static.ui.com/fingerprint/ui/icons/${row.icon.id}_${row.icon.resolutions[0][0]}x${row.icon.resolutions[0][1]}.png`}
            alt={row.product.name}
          />
          <div className="body1">{row.line.name}</div>
          <div className="body2">{row.product.name}</div>
        </div>
      ),
    );

  const productCardData = (
    (filteredDevices?.length && filteredDevices) ||
    deviceData
  )
    //improve this type
    ?.map((product: any) => {
      return {
        productName: product.product.name,
        line: product.line.name,
        shortnames: product.shortnames,
        imagePath: `https://static.ui.com/fingerprint/ui/icons/${product.icon.id}_${product.icon.resolutions[2][0]}x${product.icon.resolutions[2][1]}.png`,
      };
    });

  const productCardGrid = productCardData?.map((data) => {
    return <ProductCard productData={data} />;
  });

  return (
    <div className={styles.deviceList}>
      {deviceData ? (
        deviceDisplay === 'list' ? (
          <Table rows={rows()} />
        ) : (
          <div className={styles.productCardGrid}>{productCardGrid}</div>
        )
      ) : (
        <h1>Loading Devices...</h1>
      )}
    </div>
  );
};

export default DeviceList;
