import { Button, Grid } from '@material-ui/core';
import { AddOutlined } from '@material-ui/icons';
import {
  GenericFormContainer,
  GenericFormFieldContainer,
  GenericFormSubmitButtonContainer,
  TGenericFormSubmitHandlerFn
} from '@energyweb/zero-ui-core';
import * as yup from 'yup';
import { greenLabelFormFields } from './GreenLabelForm.fields';

export enum GreenLabelTypeEnum {
  EKOenergy = 'EKOenergy',
  GreenE = 'Green-E',
  BraMiljoval = 'Bra Miljöval',
  OkPower = 'OK POWER',
  TuVNord = 'TuV Nord',
  TuvSud = 'TuV Sud',
  NaturmadeStar = 'Naturmade Star',
}

export interface GreenLabelFormFields {
  greenLabel: GreenLabelTypeEnum;
}

export interface GreenLabelFormProps {
  data?: GreenLabelTypeEnum;
  readOnly?: boolean;
  submitHandler: TGenericFormSubmitHandlerFn<GreenLabelFormFields>;
}

const greenLabelFormSchema = yup.object().shape({
  greenLabel: yup
    .string()
    .oneOf([
      GreenLabelTypeEnum.EKOenergy,
      GreenLabelTypeEnum.GreenE,
      GreenLabelTypeEnum.OkPower,
      GreenLabelTypeEnum.NaturmadeStar,
      GreenLabelTypeEnum.TuvSud,
      GreenLabelTypeEnum.TuVNord,
      GreenLabelTypeEnum.BraMiljoval,
    ]),
});

export interface IGreenLabel {
  type: GreenLabelTypeEnum;
  proofDocumentId: string | null;
}

export const GreenLabelForm = ({
  data,
  readOnly,
  submitHandler,
}: GreenLabelFormProps) => {
  return (
      <GenericFormContainer<GreenLabelFormFields>
        nested
        submitHandler={submitHandler}
        validationSchema={greenLabelFormSchema}
        initialValues={{ greenLabel: data }}
        fields={greenLabelFormFields}
      >
        <Grid
          container
          flexWrap={'nowrap'}
          columnGap={2}
          alignItems={'flex-end'}
        >
          <Grid item sm={12}>
            <GenericFormFieldContainer fieldName={'greenLabel'} />
          </Grid>
          {!readOnly && (
            <Grid item sm={2} justifyItems={'flex-end'}>
              <GenericFormSubmitButtonContainer
                render={({ onSubmit, isValid, isDirty }) => (
                  <Button
                    disabled={!isValid || !isDirty}
                    onClick={onSubmit}
                    startIcon={<AddOutlined color={'secondary'} />}
                    sx={{
                      // should remove hard coded colors
                      backgroundColor: '#fff',
                      color: 'primary.main',
                      fontWeight: 700,
                      '&:hover': { color: '#fff' },
                    }}
                    variant={'contained'}
                  >
                    {/* should localize */}
                    Add green label
                  </Button>
                )}
              />
            </Grid>
          )}
        </Grid>
      </GenericFormContainer>
  );
};