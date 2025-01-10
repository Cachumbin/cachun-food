import Logo from "../components/logo";
import Discover from "../components/Discover";
import Menu from "../components/Menu";

const Home = () => {
  return (
    <div>
      <section className="upper-container">
        <Logo />
        <Discover />
      </section>
      <Menu />
    </div>
  );
};

export default Home;
