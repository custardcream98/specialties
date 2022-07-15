import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "app/actions";
import { TOKEN } from "web3/session";

const Profile = () => {
  const profile = useSelector((state) => state.profile);
  return <div></div>;
};

export default Profile;
