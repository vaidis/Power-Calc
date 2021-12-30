import * as React from "react";

// redux
import { useSelector,useDispatch } from "react-redux";
import { setSymbol } from "./houseSlice";

// material-ui
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";



export default function Currency({ houseIndex }) {
  const dispatch = useDispatch();

  // GET the value for the select list
  const symbol = useSelector(
    (state) => state.houses.houses[houseIndex].cost.symbol
  );

  // SET the value on the redux store
  const handleChange = (event) => {
    const payload = { houseIndex, symbol: event.target.value };
    dispatch(setSymbol(payload));
  };

  return (
    <Box>
      <FormControl>
        <Select
          id="demo-simple-select"
          value={symbol}
          onChange={handleChange}
          variant={"outlined"}
          size="small"
        >
          <MenuItem value={0}>€</MenuItem>
          <MenuItem value={1}>$</MenuItem>
          <MenuItem value={2}>£</MenuItem>
          <MenuItem value={3}>¥</MenuItem>
          <MenuItem value={4}>₹</MenuItem>
          <MenuItem value={5}>₽</MenuItem>
          <MenuItem value={6}>ɱ</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
