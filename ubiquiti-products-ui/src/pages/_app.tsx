import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import {
  DeviceDataContext,
  DeviceDisplayContext,
  FilteredDevicesContext,
} from '@/contexts/contexts';
import { DeviceData, DeviceDisplayOption } from '@/constants/types';
import Layout from '@/components/Layout/Layout';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [deviceData, setDeviceData] = useState<DeviceData>([]);
  const [deviceDisplay, setDeviceDisplay] =
    useState<DeviceDisplayOption>('list');
  const [filteredDevices, setFilteredDevices] = useState<DeviceData>([]);

  console.log(pageProps)

  return (
    <DeviceDataContext.Provider value={{ deviceData, setDeviceData }}>
      <DeviceDisplayContext.Provider
        value={{ deviceDisplay, setDeviceDisplay }}
      >
        <FilteredDevicesContext.Provider
          value={{ filteredDevices, setFilteredDevices }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FilteredDevicesContext.Provider>
      </DeviceDisplayContext.Provider>
    </DeviceDataContext.Provider>
  );
}
