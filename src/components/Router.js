import React from "react";
import { useSelector } from "react-redux";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/NavigationBar";

function AppRouter() {
  const isLoggedIn = useSelector((state) => state.isUserLoggedIn);

  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
}

export default AppRouter;
