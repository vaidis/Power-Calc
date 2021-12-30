import React from "react";

// MaterialUI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setStatus } from "./houseSlice";

// Firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

// Components
import House from "./House";
import AddHouse from "./AddHouse";

// css
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


function Houses() {

  // Redux
  const { houses } = useSelector((state) => state.houses);
  const { status } = useSelector((state) => state.houses);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // don't overwrite the firebase data with the default anonymous data
    if (user !== "anonymous" && status !== "empty") {

      // save to firebase
      if (status === "ready") {
        setDoc(doc(db, "users", user), { houses });
      }

      // don't change the data just loaded from firebase
      if (status === "firebase") {
        dispatch(setStatus("ready"));
      }
    }

  }, [dispatch, status, user, houses]);

  // for tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          {houses.map((house, index) => {
            return (
              <Tab
                icon={<HomeIcon />}
                iconPosition="start"
                key={index}
                label={house.title}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>

        <AddHouse />
      </Box>

      {houses && houses.length ? (
        houses.map((house, index) => {
          return (
            <TabPanel key={index} value={value} index={index}>
              <House house={house} houseIndex={index} setValue={setValue} />
            </TabPanel>
          );
        })
      ) : (
        <Box sx={{ mt: 10, mb: 15}}>
          <Loader type="Rings" color="#4e66e8" height={100} width={100} />
        </Box>
      )}
    </div>
  );
}

export default Houses;
