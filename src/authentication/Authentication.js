import * as React from "react";

// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// redux
import { useDispatch } from "react-redux";
import { setUserAction } from "./userSlice";
import { restoreSaved, setStatus } from "../components/House/houseSlice";
import { setInitialState } from "../components/House/houseSlice";

// firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

// components
import Login from "./Login";
import Logout from "./Logout";

export default function Layout() {
  const [user, setUser] = React.useState({});
  const auth = getAuth();
  const dispatch = useDispatch();

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      // if authenticated then load the firebase config
      if (user) {
        setUser(user);
        dispatch(setUserAction(user.email))
        
        // get data from firebase
          const getuserConfig = async () => {
            const docRef = doc(db, "users", user.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const { houses } = docSnap.data()
              dispatch(restoreSaved(houses))
              dispatch(setStatus('firebase'))
            } else {
              console.log("No such document!");
            }

          };

          getuserConfig();

      } else {
        // if anonymous then load the default house
        setUser({});
        dispatch(setUserAction('anonymous'))
        dispatch(setInitialState())
      }
    });

    return null
  }, [auth, dispatch]);

  return (
    <Box>
      {user.displayName ? (
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Typography sx={{display: { xs: 'none', sm: 'block' } }}>Hello</Typography>
          <Typography sx={{ ml: 1}}>{user.displayName}</Typography>
          <Logout />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <Login />
          <Typography sx={{display: { xs: 'none', sm: 'block' } }}>to store your config</Typography>
        </Box>
      )}
    </Box>
  );
}
