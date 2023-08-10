import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

type SwipeProps = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
};
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Drawer({
  open,
  handleDrawerOpen,
  handleDrawerClose,
}: SwipeProps) {
  const theme = useTheme();

  const handleOpen = () => {
    handleDrawerOpen();
  };

  const handleClose = () => {
    handleDrawerClose();
  };

  const navItems = [
    {
      id: 1,
      to: "/",
      text: "Home",
    },
    {
      id: 2,
      to: "/addCourse",
      text: "Add Course",
    },
  ];

  const navigate = useNavigate();
  const handleNavClick = (item: { id: number; to: string; text: string }) => {
    navigate(item.to);
    handleClose();
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={item.id}
            disablePadding
            onClick={() => {
              handleNavClick(item);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {["Add Course", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Divider />
        <SwipeableDrawer open={open} onClose={handleClose} onOpen={handleOpen}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
