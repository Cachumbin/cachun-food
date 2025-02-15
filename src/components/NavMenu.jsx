import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { IoClose } from "react-icons/io5";

const NavMenu = () => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

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

  const goToHome = () => {
    navigate("/");
  };

  const goToSaved = () => {
    navigate("/saved");
  };

  const goToSearch = () => {
    navigate("/search");
  };

  return (
    <div className="navmenu-window window">
      <div className="navmenu-top-bar window-top-bar">
        <button className="navmenu-button window-button">
          <IoClose className="navmenu-icon window-icon" />
        </button>
        <div className="navmenu-text-container window-text-container">
          <p className="window-text">Navigate</p>
        </div>
      </div>
      <div className="navmenu-content window-content">
        <div className="window-content-page">
          {user ? <SignOut info={userDetails} /> : <SignIn />}
          <div className="button-container">
            <button className="nav-button" onClick={goToHome}>
              Home
            </button>
            <button className="nav-button" onClick={goToSaved}>
              Saved
            </button>
            <button className="nav-button" onClick={goToSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
