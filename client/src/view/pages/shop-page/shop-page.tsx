import { useNavigate } from "react-router";
import { useUser } from "../../../controllers/hooks/use-user";
import { NavLink, Outlet } from "react-router-dom";

import Navbar from "../../components/navbar";

interface SidebarLinkProps {
  label: string;
  section: string;
  // icon: JSX.Element;
}

const ShopPage = () => {
  const { user, isLoading, isLoggedIn } = useUser();

  if (isLoading) return <div>Loading</div>;

  if (!isLoggedIn) return <div>You need to login to start selling!</div>;

  return (
    <div className="w-screen h-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default ShopPage;
