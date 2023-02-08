import { useEffect, useState } from "react";
import { IListing } from "../../../types/types";
import { useListings } from "../../../controllers/hooks/use-listings";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";

const ProductPage = () => {
  const params = useParams();
  const { getListingById } = useListings();

  if (params.listingId === undefined) return <div>Listing not found!</div>;

  const [listing, setListing] = useState<IListing>();

  useEffect(() => {
    getListingById(params.listingId as string).then((listing) =>
      setListing(listing)
    );
  }, []);

  if (listing === undefined) return <div>Loading</div>;

  return (
    <div className="w-screen h-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="w-3/4 flex mx-auto py-10">
        <div className="w-1/2 aspect-square bg-black"></div>
        <div className="w-1/2">
          <div className="w-3/4 mx-auto">
            <p className="text-[30px] font-extrabold truncate">
              {listing.headline}
            </p>
            <p className="font-thin">{listing.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
