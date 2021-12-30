import React from "react";

// material-ui
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// redux
import { useDispatch, useSelector } from "react-redux";
import { addHouse } from "../House/houseSlice";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};



function AddHouse({ houseIndex, areaIndex }) {
  const dispatch = useDispatch();
  const [houseTitle, setHouseTitle] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  // Disable ADD HOUSE button if more that 4 houses
  const { houses } = useSelector((state) => state.houses);
  React.useEffect(() => {
    setDisabled(false);
    const housesCounter = Object.keys(houses).length;
    if (housesCounter > 3) {
      setDisabled(true);
    }
  }, [houses]);

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setHouseTitle(event.target.value);
  };

  const addHouseHandler = () => {
    const payload = { houseTitle };
    dispatch(addHouse(payload));
    handleClose();
    setHouseTitle("");
  };

  return (
    <div>
      <Button disabled={disabled} onClick={handleOpen}>
        <AddCircleIcon />
        &nbsp;&nbsp;Add House
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Header title */}
          <Box
            sx={{
              mb: 4,
              p: 4,
              color: "white",
              background: (theme) => theme.palette.primary.main,
            }}
          >
            <Typography id="modal-modal-title" variant="h4">
              Add new house
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            <TextField
              label="House Title"
              id="outlined-name"
              value={houseTitle}
              onChange={handleChange}
              autoFocus={true}
              size="small"
              inputProps={{ inputMode: "text", maxLength: "16" }}
            />
          </Box>

          {/* Cancel n Save buttons */}
          <Box sx={{ p: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => addHouseHandler()}
              disabled={houseTitle === "" ? true : false}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddHouse;
