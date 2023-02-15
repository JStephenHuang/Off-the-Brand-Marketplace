import { Link } from "react-router-dom";
import { IListing } from "../../types/types";

const ListingCards = ({ listing }: { listing: IListing }) => {
  return (
    <Link to={`/products/${listing._id}`}>
      <div className="aspect-square bg-black rounded-sm" />

      <div className="text-start mt-1">
        <p className="font-extrabold tracking-tighter">
          CAD${listing.price.toFixed(2)}
        </p>
        <p className="opacity-50 text-[12px]">
          sold by {listing.seller.username}
        </p>
      </div>
    </Link>
  );
};

export default ListingCards;
