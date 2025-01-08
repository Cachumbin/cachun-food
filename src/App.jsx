import Logo from "./components/logo";
import Discover from "./components/Discover";
import Search from "./components/Search";
import { db } from "./components/firebaseConfig";

const App = () => {
  return (
    <div>
      <Logo />
      <p>App</p>
      <Discover />
      <Search />
    </div>
  );
};

export default App;
