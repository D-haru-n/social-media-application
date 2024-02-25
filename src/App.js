import React, { useContext, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyle";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profile from "./components/pages/Profile";
import { AuthContext } from "./contexts/AuthContext/AuthContext";
import { NotificationContainer } from "react-notifications";

function App() {
  const { user } = useContext(AuthContext);
  const [rerenderFeed, setRerenderFeed] = useState(0);
  
  const handleChange = useCallback((newValue) => {
    setRerenderFeed(newValue);
  }, []);

  return (
    <>
      <GlobalStyles />
      <NotificationContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Home rerenderFeed={rerenderFeed} onChange={handleChange} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/profile/:username"
            element={
              user ? (
                <Profile rerenderFeed={rerenderFeed} onChange={handleChange} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
