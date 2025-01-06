import Logo from "./components/logo";
import Discover from "./components/Discover";
import { db } from "./components/firebaseConfig";
//import { useEffect, useState } from "react";

const App = () => {
  return (
    <div>
      <Logo />
      <p>App</p>
      <Discover />
    </div>
  );
};

export default App;
