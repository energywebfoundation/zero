import { ReactNode, ReactNodeArray } from 'react';

export interface LayoutNoTopbarProps {
  children: ReactNode | ReactNodeArray;
}

export function LayoutNoTopbar({ children }: LayoutNoTopbarProps) {
  return <div>{children}</div>;
}

export default LayoutNoTopbar;
