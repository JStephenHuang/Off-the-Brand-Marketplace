import { useListings } from "../../../controllers/hooks/use-listings";
import { useUser } from "../../../controllers/hooks/use-user";
import Navbar from "../../components/navbar";
import ListingCard from "../../components/listing-cards";
import { useMessages } from "../../../controllers/hooks/use-messages";

const MainPage = () => {
  const { listings } = useListings();

  if (listings === undefined) return <div>Loading</div>;

  return (
    <div className="w-screen h-screen text-center">
      <header className="h-[10%]">
        <Navbar />
      </header>
      <div className="flex flex-col items-center">
        <div className="w-full h-[25rem] bg-black"></div>
        <div className="w-4/5 mt-10">
          <section className="w-full">
            <p className="font-bold text-[20px] text-start mb-5">
              New uniforms
            </p>
            <div className="grid grid-cols-5 gap-3 mb-10">
              {listings.slice(0, 5).map((listing, key) => (
                <ListingCard key={key} listing={listing} />
              ))}
            </div>
          </section>
          <section className="w-full">
            <p className="font-bold text-[20px] text-start mb-5">New</p>
            <div className="grid grid-cols-4 gap-3 mb-10">
              {listings.slice(0, 4).map((listing, key) => (
                <ListingCard key={key} listing={listing} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
