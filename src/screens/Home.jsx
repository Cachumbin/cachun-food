import Logo from "../components/logo";
import Discover from "../components/Discover";
import NavMenu from "../components/NavMenu";

const Home = () => {
  return (
    <div className="home">
      <section className="header">
        <Logo />
        <NavMenu />
      </section>
      <main className="main-container">
        <Discover />
      </main>
    </div>
  );
};

export default Home;
