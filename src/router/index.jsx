import { Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
import Saved from "../screens/Saved";
import NotFound from "../screens/NotFound";

const RoutesForApp = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesForApp;
