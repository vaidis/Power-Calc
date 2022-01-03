import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "@mui/material/Link";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import ListCategory from "./ListCategory";
import ListDevice from "./ListDevice";

import { useDispatch } from "react-redux";
import { addDevice } from "../House/houseSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};



function AddDevice({ houseIndex, areaIndex }) {

  // Local state
  const [categoryId, setCategoryId] = React.useState();
  const [device, setDevice] = React.useState("");

  // Modal
  const [disabled, setDisabled] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Redux
  const dispatch = useDispatch();

  const addDeviceHandler = () => {
    const payload = { houseIndex, areaIndex, device };
    dispatch(addDevice(payload));
    handleClose();
  };



  return (
    <div>
      <Link href="#" onClick={handleOpen}>
        <AddCircleIcon color="success" />
      </Link>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {/* Header title */}
          <Box sx={{ mb: 4, p: 4, color: "white", background: (theme) => theme.palette.primary.main }}>
            <Typography id="modal-modal-title" variant="h4" >
              Add a device
            </Typography>
          </Box>

          {/* Select Category and Device input fields */}
          <Box sx={{ p: 4 }}>
            <ListCategory setCategoryId={setCategoryId} />
            {categoryId !== undefined && (
              <ListDevice
                setDisabled={setDisabled}
                categoryId={categoryId}
                device={device}
                setDevice={setDevice}
              />
            )}
          </Box>

          {/* Cancel n Save buttons */}
          <Box sx={{ p: 4, display: "flex", justifyContent: "flex-end"}}>
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button
              disabled={disabled}
              variant="contained"
              onClick={() => addDeviceHandler()}
              // disabled={device === "" ? true : false}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AddDevice;
