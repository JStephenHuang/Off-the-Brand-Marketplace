import { useUser } from "../../../controllers/hooks/use-user";
import Navbar from "../../components/navbar";

const ProfilePage = () => {
  const { user, isLoading, isLoggedIn } = useUser();

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="w-screen h-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>
      <div className="text-center">Hello {user.username}</div>
    </div>
  );
};

export default ProfilePage;
