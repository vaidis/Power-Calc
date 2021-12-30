import * as React from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>

      <GitHubIcon sx={{ color: "#999999", mr: 1 }} />
      <Link
        sx={{ color: "#999999", "textDecoration": "none" }}
        target="_blank"
        href="https://github.com/vaidis/Power-Calc"
      >
        Source Code
      </Link>
    </Box>
  );
}
