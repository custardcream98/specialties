import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "app/actions";
import { TOKEN } from "web3/session";

function Home() {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem(TOKEN)}`,
      },
      method: "GET",
    })
      .then((respone) => {
        if (!respone.ok) {
          throw new Error("Token Not Valid");
        }
        return respone.json();
      })
      .then((result) => {
        dispatch(setProfile(result.username, result.wallet_address));
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
