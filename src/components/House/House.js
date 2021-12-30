import React from "react";

// material-ui
import Box from "@mui/material/Box";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";

// redux
import { useDispatch } from "react-redux";
import { delHouse } from "../House/houseSlice";

// components
import Area from "../Area/Area";
import AddArea from "../Area/AddArea";
import Price from "./Price";
import HouseCost from "./HouseCost";
import CurrencySelect from "./CurrencySelect";



function AddDevice({ house, houseIndex, setValue }) {
  const dispatch = useDispatch();

  function delHouseHandler(id) {
    setValue(0); // on delete return to a valid tab
    dispatch(delHouse(id));
  }

  return (
    <div className="house">
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { sm: "row", xs: "column" },
          justifyContent: {sm: "space-between", xs: "end"},
        }}
      >
        {/*
         * Show and Edit KW/h cost and currency
         */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <span className="bigfont colorGray">KW/h cost:&nbsp;&nbsp;</span>
          <Price houseIndex={houseIndex} price={house.cost.price} />
          <CurrencySelect houseIndex={houseIndex} />
        </Box>

        {/*
         * Delete House button
         */}
        <Box
          sx={{ mt: {sm: 0, xs: 4}}}
        >
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => delHouseHandler(houseIndex)}
          >
            <HighlightOffIcon />
            &nbsp;&nbsp;Delete House
          </Button>
        </Box>
      </Box>

      {/*
       * Show house total Cost
       */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HouseCost houseIndex={houseIndex} />
      </Box>

      {/*
       * Iterate house Areas
       */}
      {house.areas.map((area, index) => {
        return (
          <div key={index}>
            <Area
              area={area}
              areaIndex={index}
              houseIndex={houseIndex}
              cost={house.cost}
            />
          </div>
        );
      })}

      {/*
       * Add mew area
       */}
      <AddArea houseIndex={houseIndex} />
    </div>
  );
}

export default AddDevice;
