import * as React from "react";

// material-ui
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
  const { watt, hours, multiplier, model } = useSelector(
    (state) => state.houses.houses[houseIndex].areas[areaId].devices[deviceId]
  );

  function editDeviceHandler() {
    const payload = {
      houseIndex,
      areaId,
      deviceId,
      watt: newWatt,
      hours: newHours,
      multiplier: newMultiplier,
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
  const [newMultiplier, setNewMultiplier] = React.useState(multiplier);

  const onNewWattChange = (e) => setNewWatt(e.target.value);
  const onNewHoursChange = (e) => setNewHours(e.target.value);
  const onNewMultiplierChange = (e) => setNewMultiplier(e.target.value);

  // Disable submit if hours value is more than normal
  const [disabled, setDisabled] = React.useState(true);
  
  React.useEffect(() => {
    console.log("kwh changed");
    if (newMultiplier === 1 && newHours > 744) {setDisabled(true)} 
    else if (newMultiplier === 4 && newHours > 168) {setDisabled(true)}
    else if (newMultiplier === 31 && newHours > 24) {setDisabled(true)}
    else setDisabled(false);
  }, [newHours, newMultiplier]);

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
          <Box
            sx={{
              p: 4,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              m: "0",
            }}
          >
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
              ></TextField>
            </div>

            <Select
              id="simple-select"
              value={newMultiplier}
              onChange={onNewMultiplierChange}
              sx={{ color: (theme) => theme.palette.primary.main }}
            >
              <MenuItem value={31}>Daily</MenuItem>
              <MenuItem value={4}>Weekly</MenuItem>
              <MenuItem value={1}>Monthly</MenuItem>
            </Select>
          </Box>

          <Box
              sx={{
                pl: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#eb78a9"
              }}
            >
              {newMultiplier === 1 && <div>Maximum <strong>montly</strong> hours: 744 </div>}
              {newMultiplier === 4 && <div>Maximum <strong>weekly</strong> hours: 168 </div>}
              {newMultiplier === 31 && <div>Maximum <strong>daily</strong> hours: 24 </div>}
            </Box>

          {/* Cancel n Save buttons */}
          <Box sx={{ p: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button
              disabled={disabled}
              variant="contained"
              onClick={() => editDeviceHandler()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
