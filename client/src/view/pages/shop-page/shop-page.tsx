import { useNavigate } from "react-router";
import { useUser } from "../../../controllers/hooks/use-user";
import { NavLink, Outlet } from "react-router-dom";

import Navbar from "../../components/navbar";

interface SidebarLinkProps {
  label: string;
  path: string;
  // icon: JSX.Element;
}

const SidebarLink = (props: SidebarLinkProps) => {
  return (
    <NavLink
      to={`${props.path}`}
      className={({ isActive }) =>
        isActive ? "shop-sidebar-link" : "shop-sidebar-link-active"
      }
    >
      {props.label}
    </NavLink>
  );
};

const ShopSiderbar = () => {
  return (
    <div className="w-1/5 flex flex-col border-r h-full font-bold fixed">
      <SidebarLink label="Listings" path="listings" />
      <SidebarLink label="Dashboard" path="dashboard" />
    </div>
  );
};

const ShopPage = () => {
  const { isLoading, isLoggedIn } = useUser();

  if (isLoading) return <div>Loading</div>;

  if (!isLoggedIn) return <div>You need to login to start selling!</div>;

  return (
    <div className="w-screen h-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="flex w-full h-full">
        <div className="w-1/5">
          <ShopSiderbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default ShopPage;
