import { ReactNode, ReactNodeArray, createContext } from 'react';
import { GenericFormContextData } from '../../containers';

/* eslint-disable-next-line */
export interface GenericFormContextProviderProps<T = GenericFormContextData> {
  formConfig: T;
  children: ReactNode | ReactNodeArray;
}

export const GenericFormContext = createContext<GenericFormContextData | null>(
  null
);

export const GenericFormContextProvider = ({
  children,
  formConfig,
}: GenericFormContextProviderProps) => (
  <GenericFormContext.Provider value={formConfig}>
    {children}
  </GenericFormContext.Provider>
);

export default GenericFormContextProvider;
