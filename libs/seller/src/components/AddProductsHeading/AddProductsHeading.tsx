import styled from "@emotion/styled";
import { Box, Typography } from "@material-ui/core"
import { useTranslation } from "react-i18next";

export interface AddProductsHeading {
  amountOfForms?: number;
}

const StyledTypography = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
`

export const AddProductsHeading = ({ amountOfForms }: AddProductsHeading) => {
  const { t } = useTranslation();
  return (
    <Box>
      <StyledTypography color="primary">
        {t('forms.SellerAddFacilitiesProductsForm.addProductsHeading') + ` (${amountOfForms ?? ''})`}
      </StyledTypography>
    </Box>
  )
}
