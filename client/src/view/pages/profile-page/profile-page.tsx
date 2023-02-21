import { useUser } from "../../../controllers/hooks/use-user";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";

const ProfilePage = () => {
  const { user, isLoading, isLoggedIn } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading</div>;

  if (!isLoggedIn) navigate("/login");

  return (
    <div className="w-screen h-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="text-center"></div>
    </div>
  );
};

export default ProfilePage;
