import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const drawerWidth = 300;

function SliderBar() {
    return (
        <>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
                }}
            >
                <Typography variant="h4" textAlign={"center"} paddingTop={5} borderBottom={1} borderColor={"#ccc"}>
                    Xin chào Admin
                </Typography>
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        {[
                            { text: "Danh sách sản phẩm", link: "/admin/products" },
                            { text: "Danh mục sản phẩm", link: "admin/category-list" },
                            { text: "Thông tin người dùng", link: "admin/user-info" },
                            { text: "Danh sách đơn hàng", link: "admin/order-list" },
                        ].map((item, index) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton component={Link} to={item.link}> {/* Use component={Link} and to={item.link} */}
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </>
    );
}

export default SliderBar;
