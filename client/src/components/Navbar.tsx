import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-[10%] w-full border-b flex items-center justify-between px-5">
      <Link to="/" className="font-extrabold text-[24px] italic">
        Off the Brand
      </Link>
      <Link to="/login" className="px-6 py-2 bg-black rounded-sm text-white">
        Login
      </Link>
    </div>
  );
};

export default Navbar;
