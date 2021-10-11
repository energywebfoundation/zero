import Paper, { PaperProps } from '@material-ui/core/Paper/Paper';
import { DetailedHTMLProps, HTMLAttributes, ReactNode, ReactNodeArray } from 'react';

export interface GenericFormCardProps {
  children: ReactNode | ReactNodeArray;
  wrapperProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  paperProps?: PaperProps;
}

export const GenericFormCard = ({ children, wrapperProps, paperProps }: GenericFormCardProps) => (
  <div {...wrapperProps}>
    <Paper sx={{ p: '32px' }} {...paperProps}>
      {children}
    </Paper>
  </div>
);
