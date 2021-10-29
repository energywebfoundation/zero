import styled from '@emotion/styled';
import { Grid, Box, Typography, Button } from '@material-ui/core';
import {
  GenericFormFieldContainer,
  TGenericFormSubmitHandlerFn,
  GenericFormContainer,
  GenericFormCard,
} from '@energyweb/zero-ui-core';
import { Helmet } from 'react-helmet-async';
import { SettingsUserDto, UserRole } from '@energyweb/zero-api-client';
import { useSignUpPageEffects } from './Settings.effects';
import { authSignupFormFields } from './SettingsFields';
import { useSettingsPageEffects } from './SettingsPage.effects';
import { authSignUpFormSchema } from '../../../../../libs/auth/src/components/SignUpForm/SignUpForm.schema';
import { variables } from '@energyweb/zero-ui-theme';
import { useStyles } from './SettingsPage.styles';
import CreateIcon from '@material-ui/icons/Create';
import PersonAddAltIcon from '@material-ui/icons/PersonAddAlt';
import { ImageListContainer } from '../../../../seller/src/components';

export interface SettingsProps {
  submitHandler: TGenericFormSubmitHandlerFn<SettingsFormFields>;
}

export interface SettingsFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  userRole: UserRole;
  facilityImageList: string[];
}

const initialValues: Omit<SettingsUserDto, 'password' | 'roles'> = {
  firstName: '',
  lastName: '',
  email: '',
};

const StyledDiv = styled.div`
  padding-top: 26px;
`;

export const SettingsPage = () => {
  const { user } = useSettingsPageEffects();
  initialValues.firstName = user?.firstName;
  initialValues.lastName = user?.lastName;
  initialValues.email = user?.email;
  const { handleFormSubmitFn } = useSignUpPageEffects();

  const classes = useStyles();

  return (
    <StyledDiv>
      <Helmet>
        <title>Account / Settings</title>
      </Helmet>
      <GenericFormContainer<SettingsFormFields>
        submitHandler={handleFormSubmitFn}
        validationSchema={authSignUpFormSchema}
        initialValues={initialValues}
        fields={authSignupFormFields}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography
              fontSize={'20px'}
              fontWeight={700}
              color={'primary'}
              mb={'9px'}
            >
              Personal info
            </Typography>
            <Box className={classes.infoBlock}>
              {/* <GenericFormFieldContainer fieldName={'ImageUpload'} /> */}
              <GenericFormFieldContainer fieldName={'firstName'} />
              <GenericFormFieldContainer fieldName={'lastName'} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography
              fontSize={'20px'}
              fontWeight={700}
              color={'primary'}
              mb={'9px'}
            >
              Log in info
            </Typography>
            <Box
              className={classes.infoBlock}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <GenericFormFieldContainer fieldName={'email'} />
                <GenericFormFieldContainer fieldName={'password'} />
              </Box>
              <Button
                sx={{ width: '100%' }}
                variant="contained"
                color="primary"
                endIcon={<CreateIcon />}
              >
                Change the password
              </Button>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography
              fontSize={'20px'}
              fontWeight={700}
              color={'primary'}
              mb={'9px'}
            >
              Language
            </Typography>
            <Box className={classes.formBlock}>
              <GenericFormFieldContainer fieldName={'language'} />
            </Box>
            <Typography
              fontSize={'20px'}
              fontWeight={700}
              color={'primary'}
              mb={'9px'}
              mt={'24px'}
            >
              Currency
            </Typography>
            <Box className={classes.formBlock}>
              <GenericFormFieldContainer fieldName={'currency'} />
            </Box>
          </Grid>
        </Grid>
        <Box
          display="flex"
          justifyContent="center"
          p={'16px 0'}
          alignItems="center"
          mt={'24px'}
          className={classes.footerBlock}
        >
          <Typography
            fontSize={'20px'}
            fontWeight={700}
            color={'secondary'}
            mr={'25px'}
          >
            Seller account
          </Typography>
          <Typography
            fontSize={'16px'}
            fontWeight={700}
            color={'secondary'}
            mr={'24px'}
          >
            <span style={{ color: variables.primaryColor, fontWeight: 50 }}>
              You can also
            </span>{' '}
            sell renewable energy
          </Typography>
          <Button
            variant="contained"
            color="primary"
            endIcon={<PersonAddAltIcon />}
          >
            Create seller account
          </Button>
        </Box>
      </GenericFormContainer>
    </StyledDiv>
  );
};
