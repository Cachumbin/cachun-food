import Logo from "../components/logo";
import { IoClose } from "react-icons/io5";
import Construction from "../assets/construction.png";
import Tape from "../assets/yellow-tape.png";

const NotFound = () => {
  return (
    <div className="home">
      <section className="header">
        <Logo />
      </section>
      <main className="main-container">
        <div className="window error-404-window">
          <div className="window-top-bar error-404-top-bar">
            <button className="window-button error-404-button">
              <IoClose className="window-icon" />
            </button>
            <div className="dialog-text-container window-text-container error-404-text-container">
              <p className="window-text">Not Found</p>
            </div>
          </div>
          <div className="dialog-content window-content error-404-content">
            <h1>Error 404</h1>
            <p>Page not found</p>
            <div>
              <p>
                The page you are looking for might have been removed, had its
                name changed or is temporarily unavailable.
              </p>
            </div>
            <div className="superposed-container">
              <img src={Tape} alt="Tape" />
              <img src={Construction} alt="Construction" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
