import { BrowserRouter as Router } from "react-router-dom";
import { auth, db } from "./components/firebaseConfig";
import RoutesForApp from "./router";

const App = () => {
  return (
    <Router>
      <RoutesForApp />
    </Router>
  );
};

export default App;
