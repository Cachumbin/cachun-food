import { Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
import Saved from "../screens/Saved";

const RoutesForApp = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/saved" element={<Saved />} />
    </Routes>
  );
};

export default RoutesForApp;
