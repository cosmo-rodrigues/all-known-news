'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

export type Filters = {
  q?: string;
  country?: string;
  category?: string;
  language?: string;
  page?: number;
  pageSize?: number;
};

type StoreContextType = {
  filters: Record<string, Filters>;
  saveFilters: (route: string, filters: Filters) => void;
  getFilters: (route: string) => Filters;
  removeFilters: () => void;
};

export const StoreContext = createContext<StoreContextType>(
  {} as StoreContextType
);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Record<string, Filters>>(() => {
    if (typeof window !== 'undefined') {
      const savedFilters = localStorage.getItem('userFilters');
      return savedFilters ? JSON.parse(savedFilters) : {};
    }

    return {};
  });

  useEffect(() => {
    localStorage.setItem('userFilters', JSON.stringify(filters));
  }, [filters]);

  const saveFilters = (route: string, newFilters: Filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [route]: newFilters,
    }));
  };

  const getFilters = (route: string): Filters => {
    return filters[route] || {};
  };

  const removeFilters = () => {
    return localStorage.removeItem('userFilters');
  };

  return (
    <StoreContext.Provider
      value={{ filters, saveFilters, getFilters, removeFilters }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error('useStore must be used inside of a StoreProvider');
  }

  return context;
};
