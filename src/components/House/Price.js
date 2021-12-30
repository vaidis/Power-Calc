import * as React from "react";

// material-ui
import TextField from "@mui/material/TextField";

// redux
import { useDispatch } from "react-redux";
import { setPrice } from "../House/houseSlice";



export default function Price({ houseIndex, price }) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(price);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const payload = { price: value, houseIndex: houseIndex };
      dispatch(setPrice(payload));
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [value, dispatch, houseIndex]);

  return (
    <TextField
      sx={{ width: "10ch" }}
      id="outlined-name"
      value={value}
      onChange={handleChange}
      type="number"
      size="small"
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
    />
  );
}
