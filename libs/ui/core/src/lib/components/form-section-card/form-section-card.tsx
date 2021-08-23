import styled from '@emotion/styled';
import { ReactElement } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';

/* eslint-disable-next-line */
export interface FormSectionCardProps {
  sectionHeader?: string;
  sectionSubHeader?: string;
  helpText?: string;
  rememberText?: string;
  children: ReactElement;
}

const StyledFormSectionCard = styled.div``;

export const FormSectionCard = ({
  sectionSubHeader,
  sectionHeader,
  children,
  helpText,
  rememberText,
}: FormSectionCardProps) => (
  <StyledFormSectionCard>
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
          <Box mt={'-20px'}>
            <Typography color={'primary'} fontWeight={500}>
              {helpText}
            </Typography>
            {rememberText && (
              <Typography color={'primary'} fontWeight={700}>
                Remember: {rememberText}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </CardContent>
    </Card>
  </StyledFormSectionCard>
);

export default FormSectionCard;
