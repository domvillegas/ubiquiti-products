import { DeviceData, DeviceDisplayOption } from '@/constants/types';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export const DeviceDataContext = createContext<{
  deviceData: DeviceData;
  setDeviceData: Dispatch<SetStateAction<DeviceData>>;
}>({
  deviceData: [],
  setDeviceData: () => {},
});

export const DeviceDataProvider = ({ children }: { children: ReactNode }) => {
  const [deviceData, setDeviceData] = useState<DeviceData>([]);

  useEffect(() => {
    fetch('https://static.ui.com/fingerprint/ui/public.json')
      .then((response) => response.json())
      .then((data) => setDeviceData(data.devices));
  }, []);

  return (
    <DeviceDataContext.Provider value={{ deviceData, setDeviceData }}>
      {children}
    </DeviceDataContext.Provider>
  );
};

export const useDeviceData = () => useContext(DeviceDataContext);
