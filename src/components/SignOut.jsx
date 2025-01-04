import { getAuth, signOut } from "firebase/auth";

const SignOutComponent = () => {
  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Error signing out: ", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOutComponent;
