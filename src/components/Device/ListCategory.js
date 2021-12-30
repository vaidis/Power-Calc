import * as React from "react";

// material-ui
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// firebase
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/config";



export default function ListCategory({ setCategoryId }) {
  const [categories, setCategories] = React.useState("");

  React.useEffect(() => {
    const getCategories = async () => {
      // get categories from firebase
      const q = query(collection(db, "category"));
      const querySnapshot = await getDocs(q);

      // gather all vlaues in one object
      let selectCategories = {};
      querySnapshot.forEach((doc) => {
        selectCategories[doc.data().id] = doc.data().name;
      });

      // store categories to local var
      setCategories(selectCategories);
      return null
    };

    getCategories();
    return null
  }, [setCategories]);

  // Select input field options
  const [selected, setSelected] = React.useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);   // current selected value
    setCategoryId(e.target.value); // used by ListDevice module
  };

  return (
    <div>
      {categories ? (
        <Box sx={{ mb: 4, minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selected}
              label="Categories"
              onChange={handleChange}
            >
              {Object.keys(categories).map((category, index) => {
                return (
                  <MenuItem value={index} key={index}>
                    {categories[category]}
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
