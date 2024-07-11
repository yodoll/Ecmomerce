import { Snackbar, Alert } from "@mui/material";

type FlashProps = {
    isShow: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
    onClose: () => void;
};

function Flash({ isShow, message, severity, onClose }: FlashProps) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={isShow}
            onClose={onClose}
            autoHideDuration={1000}
        >
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>
    );
}

export default Flash;
