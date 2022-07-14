import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "app/actions";
import { ACCOUNT_ADDRESS, TOKEN } from "web3/session";

const LogInKaikas = () => {
  const [isKaikasAble, setIsKaikasAble] = useState(false);
  const [publicAccount, setPublicAccount] = useState(null);
  const dispatch = useDispatch();

  const onClick = async () => {
    const response = await tryLogin();

    if (response) {
      login(response);
      return;
    } else console.log("Auth Failed");
  };

  const allowKaikas = async () => {
    const { klaytn } = window;

    try {
      const accounts = await klaytn.enable();
      setPublicAccount(accounts[0]);
    } catch (error) {
      console.log("User denied account access");
      console.log(error);
    }

    return;
  };

  const tryLogin = () =>
    axios
      .post(
        `users/checkuser/`,
        { address: publicAccount },
        {
          baseURL: process.env.REACT_APP_BACKEND_URL,
        }
      )
      .then((respose) =>
        respose.data.nonce !== 0 ? respose.data : handleSignup()
      )
      .then(handleSignMessage)
      .then(handleAuthenticate);

  const handleSignup = () =>
    axios
      .post(
        `users/signup/`,
        { address: publicAccount },
        {
          baseURL: process.env.REACT_APP_BACKEND_URL,
        }
      )
      .then((response) => response.data);

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
    axios
      .post(
        `users/auth/`,
        {
          address: publicAccount,
          signature,
        },
        {
          baseURL: process.env.REACT_APP_BACKEND_URL,
        }
      )
      .then((response) => response.data);

  const login = ({ token }) => {
    sessionStorage.setItem(TOKEN, token);
    sessionStorage.setItem(ACCOUNT_ADDRESS, publicAccount);
    dispatch(userLogin());
  };

  const checkToken = (token) =>
    axios
      .get(`users/checkpermission/`, {
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        throw new Error(`Token Not Valid ${err.response.status}`);
      });

  useEffect(() => {
    if (typeof window.klaytn != "undefined") {
      window.klaytn.on("accountsChaged", (accounts) => {
        if (window.klaytn._kaikas.isEnabled()) setPublicAccount(accounts[0]);
      });

      if (window.klaytn.isKaikas) {
        setIsKaikasAble(true);
        if (window.klaytn._kaikas.isEnabled()) {
          setPublicAccount(window.klaytn.selectedAddress);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isKaikasAble && window.klaytn._kaikas.isEnabled()) {
      setPublicAccount(window.klaytn.selectedAddress);
    }
  }, [isKaikasAble]);

  useEffect(() => {
    if (sessionStorage.getItem(TOKEN)) {
      if (
        sessionStorage.getItem(ACCOUNT_ADDRESS) ===
        window.klaytn.selectedAddress
      ) {
        checkToken(sessionStorage.getItem(TOKEN))
          .then((response) => {
            sessionStorage.setItem(TOKEN, response.token);
            dispatch(userLogin());
          })
          .catch(console.log);
      } else {
        sessionStorage.clear();
      }
    }
  }, [publicAccount]);

  return publicAccount ? (
    <>
      <p>
        <span>카이카스가 활성화됐습니다! </span>
        <br></br>
        <span>활성화 된 지갑 주소 : {publicAccount}</span>
        <br></br>
      </p>
      <button onClick={onClick}>카이카스 로그인하기</button>
    </>
  ) : (
    <button onClick={allowKaikas} disabled={!isKaikasAble}>
      카이카스 활성화
    </button>
  );
};

export default LogInKaikas;
