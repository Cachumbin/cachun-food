import { BrowserRouter as Router } from "react-router-dom";
import RoutesForApp from "./router";

const App = () => {
  return (
    <Router>
      <RoutesForApp />
    </Router>
  );
};

export default App;
