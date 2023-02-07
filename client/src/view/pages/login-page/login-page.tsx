import { useEffect } from "react";
import { useUser } from "../../../controllers/hooks/use-user";
import { useNavigate } from "react-router-dom";
import { useFirebaseContext } from "../../../controllers/contexts/firebase-app-context";

const LoginPage = () => {
  const { isLoading, isLoggedIn } = useUser();
  const { signInWithGoogle } = useFirebaseContext();

  const navigate = useNavigate();

  if (isLoading) return <div>Loading</div>;

  if (isLoggedIn) navigate("/");

  return (
    <div className="w-screen h-screen flex">
      <div className="w-1/2 h-full grid place-items-center">
        <button
          className="px-6 py-2 bg-black rounded-sm text-white"
          onClick={signInWithGoogle}
        >
          Login
        </button>
      </div>
      <div className="w-1/2 h-full bg-black"></div>
    </div>
  );
};

export default LoginPage;
