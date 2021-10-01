import HelpOutline from '@material-ui/icons/HelpOutline';
import { ReactNode } from 'react';
import { PopOver } from '../PopOver';

export interface InfoProps {
  popoverContent: string | null;
  children: ReactNode;
}

export const Info = ({ popoverContent, children }: InfoProps) => {
  return (
    <div>
      {children}
      {popoverContent && (
        <PopOver popoverContent={popoverContent}>
          <HelpOutline
            sx={{
              fontSize: '16px',
              color: 'primary.main',
              cursor: 'pointer',
              position: 'relative',
              right: '12px',
            }}
          />
        </PopOver>
      )}
    </div>
  );
};
