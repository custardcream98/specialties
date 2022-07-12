import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Auth from "routes/Auth";
import LoadKaikas from "web3/Kaikas";
import Home from "routes/Home";
import Navigation from "components/NavigationBar";

function AppRouter({ isLoggedIn, userObj }) {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
          </>
        ) : (
          <Route path="/" element={<LoadKaikas />} />
        )}
      </Routes>
    </Router>
  );
}

export default AppRouter;
