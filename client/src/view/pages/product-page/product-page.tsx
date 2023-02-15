import { useEffect, useRef, useState } from "react";
import { IListing, IUser } from "../../../types/types";
import { useListing } from "../../../controllers/hooks/use-listings";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";

import Navbar from "../../components/navbar";
import { useMessages } from "../../../controllers/hooks/use-messages";

const SellerInfo = ({ seller }: { seller: IUser }) => {
  return (
    <div className="flex items-center">
      <div className="w-16 h-16 bg-black rounded-full" />
      <div className="flex flex-col text-black ml-2">
        <button className="hover:underline">{seller.username}</button>
        <p className="opacity-50">{seller.location}</p>
      </div>
    </div>
  );
};

const Tag = ({ tag }: { tag: string }) => {
  return (
    <div className="px-3 py-1 text-white bg-black rounded-full m-1">{tag}</div>
  );
};

const Tags = ({ listing }: { listing: IListing }) => {
  return (
    <div className="flex flex-wrap w-full">
      <Tag tag={listing.condition} />
      <Tag tag={listing.gender} />
      <Tag tag={listing.institution} />
      <Tag tag={`$${listing.price}`} />
      <Tag tag={listing.size} />
      <Tag tag={listing.type} />
    </div>
  );
};

const ProductPage = () => {
  const params = useParams();

  if (params.listingId === undefined) return <div>Listing not found!</div>;

  const { listing, owned } = useListing(params.listingId);
  const { sendMessage } = useMessages();

  const [showInput, setShowInput] = useState<boolean>(false);
  const messageInputRef = useRef<HTMLInputElement>(null);

  if (listing === undefined) return <div>Loading</div>;

  return (
    <div className="w-screen h-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="flex mx-24 mt-5">
        <div className="w-1/2 flex flex-col">
          <div className="w-full aspect-square mb-2 bg-black rounded-sm" />
        </div>
        <div className="w-[30%] flex flex-col ml-5">
          <SellerInfo seller={listing.seller} />
          <p className="tracking-wider mt-5">Tags:</p>
          <Tags listing={listing} />

          <div className="sticky top-[10%]">
            <p className="tracking-wider mt-5">{listing.headline}</p>
            <p className="text-[24px] font-extrabold tracking-tighter">
              CAD${listing.price.toFixed(2)}
            </p>

            {owned ? (
              <button
                className="p-2 bg-black rounded-sm font-bold text-white w-full mt-2 text-[20px] opacity-50"
                disabled={true}
              >
                Owned
              </button>
            ) : (
              <button
                className="p-2 bg-black rounded-sm font-bold text-white w-full mt-2 text-[20px] hover:opacity-50"
                onClick={() => setShowInput(!showInput)}
              >
                {showInput ? "Close" : "Messsage"}
              </button>
            )}

            {showInput && (
              <div className="w-full flex items-center border border-black rounded-sm mt-2">
                <input
                  className="w-full p-2 outline-none"
                  type="text"
                  placeholder={`Message the seller about the listing`}
                  ref={messageInputRef}
                />
                <button
                  onClick={() => {
                    if (!messageInputRef.current) return;
                    sendMessage(
                      listing.seller._id,
                      listing._id,
                      messageInputRef.current.value
                    );
                    messageInputRef.current.value = "";
                  }}
                  className="p-2"
                >
                  <IoSend />
                </button>
              </div>
            )}

            <p className="mt-5 opacity-50 tracking-wider">
              {listing.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
