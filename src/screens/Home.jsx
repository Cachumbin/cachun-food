import Logo from "../components/logo";
import Discover from "../components/Discover";

const Home = () => {
  return (
    <div className="home">
      <section className="header">
        <Logo />
      </section>
      <main className="main-container">
        <Discover />
      </main>
    </div>
  );
};

export default Home;
