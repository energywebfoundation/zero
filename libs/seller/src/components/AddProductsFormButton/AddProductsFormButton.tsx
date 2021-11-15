import styled from "@emotion/styled";
import { Box, Button } from "@material-ui/core"
import { Add } from "@material-ui/icons";
import { useTranslation } from "react-i18next"

export interface AddProductsFormButtonProps {
  onClick: () => void
}

const StyledBox = styled(Box)`
  margin-top: 16px;
`

export const AddProductsFormButton = ({ onClick }: AddProductsFormButtonProps) => {
  const { t } = useTranslation();
  return (
    <StyledBox>
      <Button
        onClick={onClick}
        variant="contained"
        color="primary"
        startIcon={<Add />}
      >
        {t('forms.SellerAddFacilitiesProductsForm.addProduct')}
      </Button>
    </StyledBox>
  )
}
