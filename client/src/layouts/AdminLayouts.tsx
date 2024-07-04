import { Container, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import SliderBar from "src/components/admin/Slidebar";

function AdminLayouts() {
    return (
        <>
            <Stack direction={"row"} spacing={4}>
                <SliderBar />
                <Outlet />
            </Stack>
        </>
    );
}

export default AdminLayouts;