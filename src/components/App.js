import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(true);

  useEffect(() => {}, []);
  return (
    <>
      {init ? <AppRouter /> : "로딩중"}
      <footer>&copy; Specialties {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
