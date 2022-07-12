import React, { useState } from "react";
import LoadKaikas from "web3/Kaikas";

const Auth = () => {
  const onClick = async () => {
    return <LoadKaikas />;
  };

  return <button onClick={onClick}>카이카스 로그인하기</button>;
};

export default Auth;
