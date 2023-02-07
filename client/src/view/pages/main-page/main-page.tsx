import { useUser } from "../../../controllers/hooks/use-user";
import Navbar from "../../components/navbar";

const MainPage = () => {
  const { isLoading, isLoggedIn } = useUser();

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="w-screen h-screen text-center">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <p className="my-5"></p>
    </div>
  );
};

export default MainPage;
