import React from "react";
import LogInKaikas from "web3/Kaikas";

const Auth = () => {
  return (
    <>
      <h2>🔮 Specialties</h2>
      <p>카이카스 지갑을 이용해 로그인 할 수 있습니다.</p>
      <LogInKaikas />
    </>
  );
};

export default Auth;
