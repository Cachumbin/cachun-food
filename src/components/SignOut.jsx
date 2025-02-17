import { getAuth, signOut } from "firebase/auth";
import PropTypes from "prop-types";

const SignOutComponent = ({ info }) => {
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Error signing out: ", error.message);
    }
  };

  return (
    <div className="logo-signout">
      <div className="logo-2-upper-row">
        <img src={info.photoURL} alt="" />
        <div className="logo-signout-text">
          <h3>{info.displayName}</h3>
          <p>{info.email}</p>
        </div>
      </div>
      <button className="nav-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};
SignOutComponent.propTypes = {
  info: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default SignOutComponent;
