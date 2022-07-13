import React from "react";
import { Link } from "react-router-dom";
import Profile from "routes/Profile";

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">홈</Link>
      </li>
      <li>
        <Link to="/profile">프로필</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
