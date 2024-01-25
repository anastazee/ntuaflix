import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Link as MuiLink } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ width: '100%', backgroundColor: '#1e849c' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", width:"100%" }}>
      <MuiLink href="/" underline="none" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" sx={{ marginLeft: '8px', color: 'white', textDecoration: 'none' }}>Ntuaflix</Typography>
        </MuiLink>
        <Typography variant="h6">Ntuaflix</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;