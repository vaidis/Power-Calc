import React from "react";
import "./App.css";
import Layout from './layout/Layout';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#4e66e8',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#e05480',
    },
    success: {
      main: '#2da481',
    },
  },
  typography: {
    h1: {
      fontFamily: "'Yanone Kaffeesatz', sans-serif",
      fontWeight: 'lighter',
    },
    h2: {
      fontFamily: "'Yanone Kaffeesatz', sans-serif",
      fontWeight: 'lighter',
    },
    h3: {
      fontFamily: "'Yanone Kaffeesatz', sans-serif",
      fontWeight: 'lighter',
    },    
    h4: {
      fontFamily: "'Yanone Kaffeesatz', sans-serif",
      fontWeight: 'lighter',
    },
    h5: {
      fontFamily: "'Yanone Kaffeesatz', sans-serif",
      fontWeight: 'lighter',
    }
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
          <Layout />
      </div>
    </ThemeProvider>
  );
}

export default App;
