import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "app/actions";
import { TOKEN } from "web3/session";

function Home() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`users/`, {
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
          Authorization: `Token ${sessionStorage.getItem(TOKEN)}`,
        },
      })
      .then((result) => {
        dispatch(setProfile(result.data.username, result.data.wallet_address));
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <h1>어서오세요 {profile.username}님!</h1>
    </div>
  );
}

export default Home;
