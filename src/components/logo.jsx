import Logo from "../assets/Recurso 1.png";

const logo = () => {
  return (
    <div className="logoContainer">
      <h1 className="logoText">CachunFood</h1>
      <img src={Logo} alt="" className="logoImg" />
    </div>
  );
};

export default logo;
