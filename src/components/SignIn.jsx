import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignInComponent = () => {
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError("Failed to sign in: " + error.message);
    }
  };

  return (
    <div className="signin">
      <h2 className="signin-title">Sign In</h2>
      <button className="nav-button signin-button" onClick={handleGoogleSignIn}>
        Sign In with Google
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInComponent;
