
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";

type ConfirmDialogProps = {
  confirm: boolean;
  onConfirm: (confirm: boolean) => void;
  onDelete: () => void;
};

export default function ConfirmDialog({
  confirm,
  onConfirm,
  onDelete,
}: ConfirmDialogProps) {
  const handleClose = () => {
    onConfirm(false);
  };

  const handleAgree = () => {
    onConfirm(false);
    onDelete();
  };

  return (
    <Dialog
      open={confirm}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Xác nhận xóa sản phẩm"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có muốn xóa sản phẩm này không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={handleClose}>Hủy</CancelButton>
        <OkButton onClick={handleAgree} autoFocus>
          Xóa
        </OkButton>
      </DialogActions>
    </Dialog>
  );
}

const OkButton = styled(Button)(
  ({ theme }) => `
  background-color: ${theme.palette.success.main};
  color: white;
  &:hover {
    background-color: ${theme.palette.success.dark};
  }
`
);

const CancelButton = styled(Button)(
  ({ theme }) => `
  background-color: ${theme.palette.error.main};
  color: white;
  &:hover {
    background-color: ${theme.palette.error.dark};
  }
`
);
