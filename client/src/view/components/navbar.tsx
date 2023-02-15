import { Link } from "react-router-dom";
import { useUser } from "../../controllers/hooks/use-user";
import { useFirebaseContext } from "../../controllers/contexts/firebase-app-context";
import { useState } from "react";

const Navbar = () => {
  const { isLoggedIn } = useUser();
  const { signOut } = useFirebaseContext();
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <div className="navbar">
      <Link to="/" className="font-extrabold text-[24px] italic">
        Off the Brand
      </Link>
      {isLoggedIn && (
        <div className="h-full flex items-center">
          <Link className="mr-5" to="/shop/new">
            Sell
          </Link>
          <Link className="mr-5" to="/inbox">
            Inbox
          </Link>
          <button
            onClick={() => setDropdown(!dropdown)}
            className="h-1/2 aspect-square bg-black rounded-full"
          ></button>
        </div>
      )}
      {!isLoggedIn && (
        <Link to="/login" className="px-6 py-2 bg-black rounded-sm text-white">
          Login
        </Link>
      )}
      {dropdown && isLoggedIn && (
        <>
          <div
            className="fixed w-screen h-screen"
            onClick={() => setDropdown(false)}
          ></div>

          <div
            style={{ boxShadow: "0 0 12px #D3D3D3" }}
            className="fixed w-[12%] flex flex-col top-[8%] right-[2%] rounded-sm bg-white font-light"
          >
            <Link
              to="/profile"
              className="py-4 px-3 hover:bg-black hover:text-white w-full tracking-wider text-center"
            >
              Your profile
            </Link>
            <Link
              to="/shop"
              className="py-4 px-3 border-y hover:bg-black hover:text-white w-full tracking-wider text-center"
            >
              Your shop
            </Link>
            <button
              className="py-4 px-3 hover:bg-black hover:text-white w-full tracking-wider"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
