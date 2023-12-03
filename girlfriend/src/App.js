import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container } from "@mui/material";

import "./App.css";
import Header from "./components/Header";
import { mytheme } from "./style/theme";
import Login from "./auth/login";
import Register from "./auth/Register";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Subscription from "./pages/Subscription";
import CreateCost from "./pages/CreateCost";

function App() {
  const [mode, setMode] = React.useState("dark");
  const theme = createTheme(mytheme(mode));
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box
          sx={{
            bgcolor: "background.darker",
            color: "text.primary",
            fontFamily: "Roboto",
          }}
          // minHeight="100vh"
          // display="flex"
          // flexDirection="column"
        >
          <Header />
          <Box
          // flexGrow={1}
          // display="flex"
          // alignItems="center"
          // justifyContent="center"
          >
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-cost" element={<CreateCost />} />

              </Routes>
              {/* <Home /> */}
              {/* <Login /> */}
              {/* <Footer /> */}
            </Container>
          </Box>

        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
