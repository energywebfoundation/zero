import { GenericFormContext, GenericFormFieldContainer } from "@energyweb/zero-ui-core"
import { useContext } from "react"

export const FieldTypeOfFinancialSupport = () => {
  const { getValues } = useContext(GenericFormContext)!;
  const isSupportedFinancially = getValues('projectSupportedFinancially');
  return (
    <>
    {isSupportedFinancially
      ? <GenericFormFieldContainer fieldName={'typeOfFinancialSupport'} />
      : null
    }
    </>
  )
}
