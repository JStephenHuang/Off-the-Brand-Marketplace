import { Link } from "react-router-dom";
import { useUser } from "../../controllers/hooks/use-user";
import { useFirebaseContext } from "../../controllers/contexts/firebase-app-context";

const Navbar = () => {
  const { user, isLoading, isLoggedIn } = useUser();
  const { signOut } = useFirebaseContext();

  return (
    <div className="navbar">
      <Link to="/" className="font-extrabold text-[24px] italic">
        Off the Brand
      </Link>
      <div>
        <Link className="mr-5" to="/shop/new">
          Sell
        </Link>
        <Link className="mr-5" to="/inbox">
          Inbox
        </Link>
        {isLoggedIn && <button onClick={signOut}>Sign out</button>}
        {!isLoggedIn && (
          <Link
            to="/login"
            className="px-6 py-2 bg-black rounded-sm text-white"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
