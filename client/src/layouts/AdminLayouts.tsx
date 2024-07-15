import { Stack } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SliderBar from "src/components/admin/Slidebar";

const user = JSON.parse(localStorage.getItem('user') || "{}");
const token = localStorage.getItem('token');
const role = user ? user.role === 'admin' : null;

function AdminLayouts() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !role) {
            navigate("/"); // Điều hướng về trang chủ hoặc trang đăng nhập nếu không hợp lệ
        }
    }, [navigate, token, role]);

    // Chỉ render giao diện quản trị nếu token và role hợp lệ
    if (!token || !role) {
        return null;
    }
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