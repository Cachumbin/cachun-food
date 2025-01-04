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
    <div>
      <h2>Sign In</h2>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignInComponent;
