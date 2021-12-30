import * as React from "react";

// material-ui
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TextField from "@mui/material/TextField";

// redux
import { useDispatch, useSelector } from "react-redux";
import { editDevice } from "../House/houseSlice";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};



export default function EditDevice({ houseIndex, areaId, deviceId }) {
  
  // Redux
  const dispatch = useDispatch();
  const { watt, hours, model } = useSelector(
    (state) => state.houses.houses[houseIndex].areas[areaId].devices[deviceId]
  );

  function editDeviceHandler() {
    const payload = {
      houseIndex,
      areaId,
      deviceId,
      watt: newWatt,
      hours: newHours,
    };
    dispatch(editDevice(payload));
    handleClose();
  }

  // Modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form
  const [newWatt, setNewWatt] = React.useState(watt);
  const [newHours, setNewHours] = React.useState(hours);

  const onNewWattChange = (e) => setNewWatt(e.target.value);
  const onNewHoursChange = (e) => setNewHours(e.target.value);

  return (
    <div>
      {/* edit button in table rows */}
      <Link href="#" onClick={handleOpen}>
        <ModeEditIcon color="primary" />
      </Link>

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
              Edit device: {model}
            </Typography>
          </Box>

          {/* watt and hours input field */}
          <Box sx={{ p: 4 }}>
            <div>
              <TextField
                onChange={onNewWattChange}
                value={newWatt}
                label="Watts"
                variant="outlined"
                id="watt"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 10000 } }}
              />
              <TextField
                onChange={onNewHoursChange}
                value={newHours}
                label="Hours"
                variant="outlined"
                id="hours"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 745 } }}
              />
            </div>
          </Box>

          {/* Cancel n Save buttons */}
          <Box sx={{ p: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button variant="contained" onClick={() => editDeviceHandler()}>
              Save
            </Button>
          </Box>

        </Box>
      </Modal>
    </div>
  );
}
