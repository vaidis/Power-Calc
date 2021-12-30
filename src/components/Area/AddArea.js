import * as React from "react";

// redux
import { useDispatch } from "react-redux";
import { addArea } from "../House/houseSlice";

// firebase
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/config";

// material-ui
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";



export default function AddArea({ houseIndex }) {
  const dispatch = useDispatch();
  const [areas, setAreas] = React.useState("");
  const [area, setArea] = React.useState("");

  React.useEffect(() => {
    let mounted = true;

    // get areas from firebase
    const getAreas = async () => {
      const devicesRef = collection(db, "areas");
      const q = query(devicesRef);
      const querySnapshot = await getDocs(q);
      let selectAreas = [];
      querySnapshot.docs.map((doc, index) => {
        selectAreas.push({
          id: index,
          title: doc.data().title,
        });
        return null;
      });
      // save areas for select field
      if (mounted) {
        setAreas(selectAreas);
      }
    };

    getAreas();
    return () => (mounted = false);
  }, []);

  // add new area to redux
  const handleChange = (e) => {
    const selectedArea = areas.find((item) => item.id === e.target.value);
    setArea(() => selectedArea);
    const payload = {
      houseIndex,
      area: { title: selectedArea.title, devices: [] },
    };
    dispatch(addArea(payload));
  };

  return (
    <div>
      {areas ? (
        <Box sx={{ mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Add new area</InputLabel>
            <Select
              sx={{ 'background': '#ffffff'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={area.id === undefined ? "" : area.id}
              label="Categories"
              onChange={handleChange}
            >
              {areas.map((area, index) => {
                return (
                  <MenuItem value={area.id} key={index}>
                    {area.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      ) : (
        <div>Loading Categories</div>
      )}
    </div>
  );
}
