import Logo from "../components/logo";
import { IoClose } from "react-icons/io5";

const NotFound = () => {
  return (
    <div>
      <Logo />
      <div className="window">
        <div className="window-top-bar">
          <button className="window-button">
            <IoClose className="window-icon" />
          </button>
          <div className="dialog-text-container window-text-container">
            <p className="window-text">Not Found</p>
          </div>
        </div>
        <div className="dialog-content window-content">
          <h1>Error 404</h1>
          <p>Page not found</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
