import styled from '@emotion/styled';
import HelpOutline from '@material-ui/icons/HelpOutline';
import { ReactNode } from 'react';
import PopOver from '../pop-over/pop-over';

/* eslint-disable-next-line */
export interface InfoProps {
  popoverContent: string | null;
  children: ReactNode;
}

const StyledInfo = styled.div``;

export const Info = ({ popoverContent, children }: InfoProps) => {
  return (
    <StyledInfo>
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
    </StyledInfo>
  );
};

export default Info;
