import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core"
import { Clear, Delete } from "@material-ui/icons"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { CallToActionButton } from "../../../layout"

interface ConfirmDeleteModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  fileName: string;
}


export const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
  open, handleClose, handleDelete, fileName
}) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      PaperProps={{ sx: { width: 625, padding: '40px 50px' } }}
    >
      <DialogTitle sx={{ paddingBottom: 0 }}>
        <Typography color="error" fontWeight="600" fontSize="24px" textAlign="center">
            {t('general.warning')}!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color="primary" fontSize="20px" fontWeight='500' textAlign="center">
          {t('components.FormFieldSelectAndFile.youAreAboutToDelete', { fileName })}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center' }}>
        <CallToActionButton
          onClick={handleClose}
          text={t('general.cancel')}
          startIcon={<Clear />}
        />
        <CallToActionButton
          onClick={handleDelete}
          text={t('general.yesDelete')}
          endIcon={
            <Box sx={{ height: 24 }}>
              <Delete color="error" />
            </Box>
          }
        />
      </DialogActions>

    </Dialog>
  )
}
