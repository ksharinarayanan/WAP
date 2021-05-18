import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import CustomButton from "../CustomButton/CustomButton";

function ContextMenu({ buttonContent, menuItems }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <CustomButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="secondary"
      >
        {buttonContent}
      </CustomButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems.map((item, index) => {
          return (
            <MenuItem onClick={handleClose} key={index}>
              {item}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default ContextMenu;
