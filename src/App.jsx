import Logo from "./components/logo";
import { auth, db } from "./components/firebaseConfig";

const App = () => {
  return (
    <div>
      <Logo />
      <p>App</p>
    </div>
  );
};

export default App;
