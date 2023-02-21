import { NavLink, Outlet } from "react-router-dom";

const ListingPage = () => {
  return (
    <div className="w-4/5 h-full px-5 py-5">
      <div className="text-[30px] font-extrabold border-b border-gray-300">
        Shop's Listings
      </div>
      <div className="flex mt-3">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "px-3 py-1 text-white border border-black bg-black rounded-full mr-2"
              : "px-3 py-1 text-black border border-black bg-white rounded-full mr-2"
          }
          to="active"
        >
          active
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "px-3 py-1 text-white border border-black bg-black rounded-full mr-2"
              : "px-3 py-1 text-black border border-black bg-white rounded-full mr-2"
          }
          to="draft"
        >
          draft
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "px-3 py-1 text-white border border-black bg-black rounded-full"
              : "px-3 py-1 text-black border border-black bg-white rounded-full"
          }
          to="sold"
        >
          sold
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default ListingPage;
