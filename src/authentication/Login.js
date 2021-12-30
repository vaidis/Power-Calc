import * as React from "react";

// material-ui
import Button from "@mui/material/Button";

// firebase
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config";



export default function Login() {

  // firebase
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("hello ", result.user.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        onClick={() => signInWithGoogle()}
        sx={{ color: "white", border: "1px solid white", mr: 1 }}
      >
        Login
      </Button>
    </div>
  );
}
