import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { IProps } from "./types";

export const Navbar: React.FC<IProps> = ({ handleOpenModal }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (item: string) => {
    if (item === "logout") {
      localStorage.clear();
      window.location.reload();
    }
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {/* <MenuItem onClick={() => handleMenuClose("")}>My Account</MenuItem> */}
          <MenuItem onClick={() => handleMenuClose("logout")}>Logout</MenuItem>
        </Menu>
        <Button variant="contained" color="info" onClick={handleOpenModal}>
          Add New Book
        </Button>
      </Toolbar>
    </AppBar>
  );
};
