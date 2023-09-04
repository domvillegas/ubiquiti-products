import { Device } from '@/constants/types';
import { ReactNode, createContext, useContext, useState } from 'react';
import { useDeviceData } from './deviceData';

interface FiltersContextValue {
  searchTerm: string;
  keywords: string[];
  results: Device[];
  setSearchTerm: (term: string) => void;
  setKeywords: (keywords: string[]) => void;
}

export const FiltersContext = createContext<FiltersContextValue>({
  searchTerm: '',
  keywords: [],
  results: [],
  setSearchTerm: () => {},
  setKeywords: () => {},
});

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const { deviceData } = useDeviceData();

  const results =
    deviceData?.filter((device) => {
      const isKeywordMatch =
        keywords.includes(device.line.name) || !keywords.length;

      const searchTermLength = searchTerm.length;
      //Trims the device name to match the length of the user's input
      //Without this, irrelevant devices will be displayed
      const deviceNameSegment = device.product.name.substring(
        0,
        searchTermLength,
      );

      return (
        isKeywordMatch &&
        deviceNameSegment.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  const contextValue = {
    searchTerm,
    setSearchTerm: (newTerm: string) => {
      setSearchTerm(newTerm);
      setKeywords([]);
    },
    keywords,
    setKeywords,
    results,
  };

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
