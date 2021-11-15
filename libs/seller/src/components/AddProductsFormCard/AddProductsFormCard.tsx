import { CallToActionButton, FieldNestedFormContext, GenericFormFieldContainer } from "@energyweb/zero-ui-core"
import { Box, Grid } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import { useContext } from "react"
import { useStyles } from "./AddProductsFormCard.styles"

export const AddProductsFormCard = () => {
  const { handleFormRemove } = useContext(FieldNestedFormContext)!;
  const classes = useStyles();
  return (
    <Box className={classes.card}>
      <Grid container columnSpacing={"16px"}>
        <Grid item lg={3} sm={6} xs={12}>
          <GenericFormFieldContainer fieldName="generationStartDate" />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <GenericFormFieldContainer fieldName="generationEndDate" />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <GenericFormFieldContainer fieldName="eacStatus" />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <GenericFormFieldContainer fieldName="totalCapacity" />
        </Grid>
        <Grid item lg={3} sm={12} xs={12}>
          <GenericFormFieldContainer fieldName="price" />
        </Grid>
        <Grid item lg={6} sm={12} xs={12}>
          <GenericFormFieldContainer fieldName="infoAboutPrice" />
        </Grid>
        <Grid item lg={3} sm={12} xs={12}>
          <Box className={classes.removeBtnWrapper}>
            <CallToActionButton
              translateKey="forms.SellerAddFacilitiesProductsForm.removeProduct"
              endIcon={<Delete />}
              onClick={handleFormRemove}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
