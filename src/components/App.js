import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(true);
  // react-reducer hooks
  const isLoggedIn = useSelector((state) => state.isUserLoggedIn);

  useEffect(() => {}, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "로딩중"}
      <footer>&copy; Specialties {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
