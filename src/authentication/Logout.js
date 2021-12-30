import * as React from "react";
import { getAuth, signOut } from "firebase/auth";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";

export default function Logout({ setUser }) {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("logout");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleSignOut()}
          sx={{ ml: 1 }}
        >
          <Typography sx={{ display: { xs: "none", sm: "block" } }}>
            Logout
          </Typography>

          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <LogoutIcon />
          </Box>
        </Button>
      </Box>

      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <IconButton component="span" onClick={() => handleSignOut()}>
          <LogoutIcon sx={{ color:"white"}}/>
        </IconButton>
      </Box>
    </div>
  );
}
