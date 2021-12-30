import * as React from "react";

// material-ui
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

// firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";



export default function ListDevice({ categoryId, device, setDevice }) {

  const [devices, setDevices] = React.useState("");

  React.useEffect(() => {

    const getDevices = async () => {
      // on change category reset device fields
      setDevice("");

      // Get available categories from firebase
      const devicesRef = collection(db, "devices");
      const q = query(devicesRef, where("categoryId", "==", categoryId));
      const querySnapshot = await getDocs(q);

      // Store query results locally 
      const selectDevices = [];
      querySnapshot.docs.map((doc, index) => {
        selectDevices.push({
          id: index,
          model: doc.data().model,
          watt: doc.data().watt,
          hours: doc.data().hours,
        });
        return null
      });

      // store categories, used for select input field
      setDevices(selectDevices);
    };

    getDevices();
    return null
  }, [categoryId, setDevices, setDevice]);


    // Select input field
    const handleChange = (e) => {
    const selectedDevice = devices.find((item) => item.id === e.target.value);
    setDevice(selectedDevice);
  };

  // user can change watt before add the device
  const onWattChange = (e) => {
    const watt = e.target.value;
    setDevice((prevState) => ({ ...prevState, watt: watt }));
  };

  // user can change hours before add the device
  const onHoursChange = (e) => {
    const hours = e.target.value;
    setDevice((prevState) => ({ ...prevState, hours: hours }));
  };

  return (
    <div>
      {devices ? (
        <Box sx={{ minWidth: 120 }}>
          <Box sx={{ mb: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Device
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={device.id === undefined ? "" : device.id}
                label="Categories"
                onChange={handleChange}
              >
                {devices.map((device, index) => {
                  console.log("device", device);
                  return (
                    <MenuItem value={device.id} key={index}>
                      {device.model} {device.watt}w
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          {device && (
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between"  }}>
                <TextField
                  onChange={onWattChange}
                  value={device.watt}
                  label="Watts"
                  variant="outlined"
                  id="watt"
                  type="number"
                />
                <TextField
                  onChange={onHoursChange}
                  value={device.hours}
                  label="Hours"
                  variant="outlined"
                  id="hours"
                  type="number"
                />
            </Box>
          )}
        </Box>
      ) : (
        <div>Loading Categories</div>
      )}
    </div>
  );
}
