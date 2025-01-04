import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Logo from "../assets/Recurso 1.png";

const LogoComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="logoContainer">
      <div className="frontFace face">
        <h1 className="logoText">CachunFood</h1>
        <img src={Logo} alt="Logo" className="logoImg" />
      </div>
      <div className="backFace face">{user ? <SignOut /> : <SignIn />}</div>
    </div>
  );
};

export default LogoComponent;
