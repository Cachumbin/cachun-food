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
    <div className="logo-window">
      <div className="logo-top-bar">
        <button className="logo-button">
          <IoClose className="logo-icon" />
        </button>
        <div className="logo-text-container">Logo</div>
      </div>
      <div className="logo-content">
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
