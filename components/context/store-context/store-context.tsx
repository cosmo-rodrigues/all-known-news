import { createContext, ReactNode, useContext } from 'react';

type StoreContextType = {};

export const StoreContext = createContext<StoreContextType>(
  {} as StoreContextType
);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <StoreContext.Provider value={{}}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error('useStore must be used inside of a StoreProvider');
  }

  return context;
};
