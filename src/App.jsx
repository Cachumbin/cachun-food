import Logo from "./components/logo";
import { db } from "./components/firebaseConfig";
import { useEffect, useState } from "react";

const App = () => {
  return (
    <div>
      <Logo />
      <p>App</p>
    </div>
  );
};

export default App;
