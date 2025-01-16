import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Logo from "../assets/cheese-cachunlogo.png";
import { IoClose } from "react-icons/io5";

const LogoComponent = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUserDetails({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setUserDetails(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="logo-window window">
      <div className="logo-top-bar window-top-bar">
        <button className="logo-button window-button">
          <IoClose className="logo-icon window-icon" />
        </button>
        <div className="logo-text-container window-text-container">Logo</div>
      </div>
      <div className="logo-content window-content">
        <div className="logo-content-page logo-1">
          <img src={Logo} alt="Logo" className="logoImg" />
          <h1 className="logoText">CachunFood</h1>
        </div>
        <div className="logo-content-page logo-2">
          {user ? <SignOut info={userDetails} /> : <SignIn />}
        </div>
      </div>
    </div>
  );
};

export default LogoComponent;
