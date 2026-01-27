import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ConfirmBoxSx = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    bgcolor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1300,
}
const confirm2Sx = {
    bgcolor: "background.paper",
    p: 4,
    borderRadius: 2,
    boxShadow: 24,
    minWidth: 300,
}
const ConfirmBox = ({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) => {
    return (
        <Box sx={{
            ...ConfirmBoxSx,
        }}
        >
            <Box
                sx={{
                    ...confirm2Sx,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {message}
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                    <Button variant="contained" color="primary" onClick={onConfirm}>
                        Confirm
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default ConfirmBox