import { useListings } from "../../../controllers/hooks/use-listings";
import { useUser } from "../../../controllers/hooks/use-user";
import Navbar from "../../components/navbar";
import ListingCards from "../../components/listing-cards";

const MainPage = () => {
  const { isLoading, isLoggedIn } = useUser();
  const { allListings } = useListings();

  if (isLoading) return <div>Loading</div>;

  console.log(allListings);

  return (
    <div className="w-screen h-screen text-center">
      <header className="h-[10%]">
        <Navbar />
      </header>
      <div className="flex flex-col items-center">
        <div className="w-4/5 my-5 grid grid-cols-4 gap-3">
          {allListings.map((listing, key) => (
            <ListingCards key={key} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
