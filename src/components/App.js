import React, { useEffect, useState } from "react";

import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {}, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "로딩중"
      )}
      <footer>&copy; Specialties {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
