import { DeviceData, DeviceDisplayOption } from '@/constants/types';
import React, { Dispatch, SetStateAction, createContext } from 'react';

export const DeviceDataContext = createContext<{
  deviceData: DeviceData;
  setDeviceData: Dispatch<SetStateAction<DeviceData>>;
}>({
  deviceData: [],
  setDeviceData: () => {},
});

export const DeviceDisplayContext = createContext<{
  deviceDisplay: 'list' | 'grid';
  setDeviceDisplay: Dispatch<SetStateAction<DeviceDisplayOption>>;
}>({
  deviceDisplay: 'list',
  setDeviceDisplay: () => {},
});

export const FilteredDevicesContext = createContext<{
  filteredDevices: DeviceData;
  setFilteredDevices: Dispatch<SetStateAction<DeviceData>>;
}>({
  filteredDevices: [],
  setFilteredDevices: () => {},
});
