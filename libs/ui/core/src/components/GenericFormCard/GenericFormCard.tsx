import Paper from '@material-ui/core/Paper/Paper';
import { ReactNode, ReactNodeArray } from 'react';

export interface GenericFormCardProps {
  children: ReactNode | ReactNodeArray;
}

export const GenericFormCard = ({ children }: GenericFormCardProps) => (
  <div>
    <Paper sx={{ p: '32px' }}>
      {children}
    </Paper>
  </div>
);

export default GenericFormCard;
