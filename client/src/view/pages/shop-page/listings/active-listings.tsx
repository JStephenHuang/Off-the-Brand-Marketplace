import { Link } from "react-router-dom";
import { useListings } from "../../../../controllers/hooks/use-listings";
import { IListing } from "../../../../types/types";
import { useState } from "react";
import { TbEye, TbEdit, TbTrash } from "react-icons/tb";

const ActiveListingCard = ({
  listing,
  deleteHandler,
}: {
  listing: IListing;
  deleteHandler: (listingId: string) => void;
}) => {
  const [showTools, setShowTools] = useState<boolean>(false);

  return (
    <div>
      <div
        onMouseEnter={() => setShowTools(true)}
        onMouseLeave={() => setShowTools(false)}
        className="aspect-square rounded-sm font-bold bg-black"
      >
        {showTools ? (
          <div className="w-full h-full flex items-center justify-around text-white">
            <Link to={`/products/${listing._id}`} className="hover:opacity-50">
              <TbEye size={30} />
            </Link>
            <Link to={`/shop/edit/${listing._id}`} className="hover:opacity-50">
              <TbEdit size={30} />
            </Link>

            <button
              className="hover:text-red-500"
              onClick={() => deleteHandler(listing._id)}
            >
              <TbTrash size={30} />
            </button>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            Active
          </div>
        )}
      </div>

      <div className="text-start mt-1">
        <p className="font-extrabold tracking-tighter">
          CAD${listing.price.toFixed(2)}
        </p>
        <p className="opacity-50 text-[12px]">
          sold by {listing.seller.username}
        </p>
      </div>
    </div>
  );
};

const ActiveListings = () => {
  const { activeListings, deleteListing } = useListings();

  if (activeListings === undefined) return <div>Loading</div>;

  return (
    <section className="w-full">
      <div className="grid grid-cols-4 gap-3 mt-3">
        {activeListings.map((listing, key) => (
          <ActiveListingCard
            key={key}
            listing={listing}
            deleteHandler={deleteListing}
          />
        ))}
      </div>
    </section>
  );
};

export default ActiveListings;
