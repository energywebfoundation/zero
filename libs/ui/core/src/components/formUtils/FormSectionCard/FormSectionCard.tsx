import { ReactElement } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';

export interface FormSectionCardProps {
  children: ReactElement;
  sectionHeader?: string;
  sectionSubHeader?: string;
  helpText?: string;
}

export const FormSectionCard = ({
  sectionSubHeader,
  sectionHeader,
  children,
  helpText,
}: FormSectionCardProps) => (
  <div>
    <Card>
      <CardHeader
        title={sectionHeader}
        subheader={sectionSubHeader}
        titleTypographyProps={{
          fontSize: '20px',
          fontWeight: 700,
          color: 'primary',
        }}
        subheaderTypographyProps={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'primary',
        }}
      />
      <CardContent>
        {helpText && (
          <Box mt={'-20px'} mb={1}>
            <Typography color={'primary'} fontWeight={500}>
              {helpText}
            </Typography>
          </Box>
        )}
        {children}
      </CardContent>
    </Card>
  </div>
);

export default FormSectionCard;
