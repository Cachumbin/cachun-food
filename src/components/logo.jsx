import Logo from "../assets/Recurso 1.png";

const LogoComponent = () => {
  return (
    <div className="logoContainer">
      <div className="frontFace face">
        <h1 className="logoText">CachunFood</h1>
        <img src={Logo} alt="Logo" className="logoImg" />
      </div>
      <div className="backFace face">
        <button>Login</button>
      </div>
    </div>
  );
};

export default LogoComponent;
