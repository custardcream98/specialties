import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "app/actions";
import "web3/session";
import { ACCOUNT_ADDRESS, TOKEN } from "web3/session";

const LogInKaikas = () => {
  const [publicAccount, setPublicAccount] = useState(null);
  const dispatch = useDispatch();

  const onClick = async () => {
    await loadAccountInfo();

    if (publicAccount) {
      const response = await tryLogin();

      if (response) {
        login(response);
        return;
      } else console.log("Auth Failed");
    }
  };

  const tryLogin = () =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/checkuser/`, {
      body: JSON.stringify({ address: publicAccount }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((users) => (users.nonce !== 0 ? users : handleSignup()))
      .then(handleSignMessage)
      .then(handleAuthenticate);

  const loadAccountInfo = async () => {
    const { klaytn } = window;

    if (klaytn) {
      try {
        await klaytn.enable();
        setPublicAccount(klaytn.selectedAddress);
      } catch (error) {
        console.log("User denied account access");
        console.log(error);
      }
    } else {
      console.log(
        "Non-Kaikas browser detected. You should consider trying Kaikas!"
      );
    }

    return;
  };

  const handleSignup = () =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup/`, {
      body: JSON.stringify({ address: publicAccount }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());

  const handleSignMessage = ({ nonce }) => {
    const { sign } = window.caver.klay;
    const message = `Specialties 로그인을 위한 서명입니다.\n로그인을 위한 과정이니 걱정하지 마세요!\n\nnonce : ${nonce}`;
    return new Promise((resolve, reject) =>
      sign(message, publicAccount, (err, signature) => {
        if (err) return reject(err);
        return resolve({ signature });
      })
    );
  };

  const handleAuthenticate = ({ signature }) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/auth/`, {
      body: JSON.stringify({
        address: publicAccount,
        signature,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((respone) => respone.json());

  const login = ({ token }) => {
    sessionStorage.setItem(TOKEN, token);
    sessionStorage.setItem(ACCOUNT_ADDRESS, publicAccount);
    dispatch(userLogin());
  };

  const checkToken = (token) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/checkpermission/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      method: "GET",
    }).then((respone) => respone.json());

  useEffect(() => {
    if (sessionStorage.getItem(TOKEN)) {
      checkToken(sessionStorage.getItem(TOKEN))
        .then((response) => {
          sessionStorage.setItem(TOKEN, response.token);
          dispatch(userLogin());
        })
        .catch(console.log);
    }
  }, []);

  return <button onClick={onClick}>카이카스 로그인하기</button>;
};

export default LogInKaikas;
