import React from "react";

// redux
import { useSelector } from "react-redux";

// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// components
import CurrencyShow from "../Common/CurrencyShow";



function HouseCost({ houseIndex }) {
  const house = useSelector((state) => state.houses.houses[houseIndex]);
  let areaTotal = 0;

  Object.keys(house.areas).map((item, index) => {
    Object.keys(house.areas[item].devices).map((device, index) => {
      let watt = house.areas[item].devices[device].watt;
      let hours = house.areas[item].devices[device].hours;
      let deviceWatt = ((watt * hours) / 1000) * house.cost.price;
      areaTotal = areaTotal + deviceWatt;
      return null;
    });
    return null;
  });

  return (
    <Box sx={{ mb: 5, display: "flex", justifyContent: "flex-end" }}>
      <Typography variant="h3">
        <span className="colorGray">total&nbsp;&nbsp;</span>
        {areaTotal.toFixed(2)}
        <CurrencyShow houseIndex={houseIndex} />
        <span className="colorGray">&nbsp;&nbsp;monthly</span>
      </Typography>
    </Box>
  );
}

export default HouseCost;
