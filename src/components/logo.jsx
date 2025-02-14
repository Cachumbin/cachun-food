import { useNavigate } from "react-router-dom";
import Logo from "../assets/cheese-cachunlogo.png";
import { IoClose } from "react-icons/io5";

const LogoComponent = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="logo-window window">
      <div className="logo-top-bar window-top-bar">
        <button className="logo-button window-button">
          <IoClose className="logo-icon window-icon" />
        </button>
        <div className="logo-text-container window-text-container">
          <p className="window-text">Logo</p>
        </div>
      </div>
      <div className="logo-content window-content">
        <div className="window-content-page logo-1">
          <img
            src={Logo}
            alt="Logo"
            className="logoImg"
            onClick={goToHome}
            style={{ cursor: "pointer" }}
          />
          <h1 className="logoText">CachunFood</h1>
        </div>
      </div>
    </div>
  );
};

export default LogoComponent;
