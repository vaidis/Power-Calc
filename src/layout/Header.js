import * as React from "react";

// material-ui
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';

// components
import Authentication from "../authentication/Authentication";



export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <ElectricalServicesIcon />
                <Typography variant="h1" sx={{ ml: 1, fontSize: '1.6em' }}>
                    Power Grid Calculator
                </Typography>
            </Box>
            <Authentication />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
