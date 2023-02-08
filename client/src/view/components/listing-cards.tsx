import { Link } from "react-router-dom";
import { IListing } from "../../types/types";

const ListingCards = ({ listing }: { listing: IListing }) => {
  return (
    <Link to={`/products/${listing._id}`}>
      <div className="w-full h-[15rem] bg-black rounded-sm" />
      <div className="flex flex-col py-3 items-start font-normal">
        <p className="w-full text-start truncate mr-2">{listing.headline}</p>
        <div className="w-full flex items-center font-thin text-[12px] my-1">
          <p className="truncate">
            {listing.institution}, {listing.type} sold by {listing.seller}
          </p>
        </div>
        <p className="">${listing.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ListingCards;
