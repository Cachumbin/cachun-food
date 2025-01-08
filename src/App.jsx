import Logo from "./components/logo";
import Discover from "./components/Discover";
import Search from "./components/Search";
import { db } from "./components/firebaseConfig";

const App = () => {
  const fetchFunction = async (search) => {
    console.log(search);
  };

  return (
    <div>
      <Logo />
      <p>App</p>
      <Discover />
      <Search fetchFunction={fetchFunction} />
    </div>
  );
};

export default App;
