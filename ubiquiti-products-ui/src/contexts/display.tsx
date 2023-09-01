import { DeviceDisplayOption } from '@/constants/types';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

export const ResultsLayoutContext = createContext<{
  deviceDisplay: 'list' | 'grid';
  setDeviceDisplay: Dispatch<SetStateAction<DeviceDisplayOption>>;
}>({
  deviceDisplay: 'list',
  setDeviceDisplay: () => {},
});

export const ResultsLayoutProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [deviceDisplay, setDeviceDisplay] =
    useState<DeviceDisplayOption>('list');

  return (
    <ResultsLayoutContext.Provider value={{ deviceDisplay, setDeviceDisplay }}>
      {children}
    </ResultsLayoutContext.Provider>
  );
};

export const useResultsLayout = () => useContext(ResultsLayoutContext);
