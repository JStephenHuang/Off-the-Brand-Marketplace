import { NavLink, Outlet, useNavigate, useOutlet } from "react-router-dom";
import { useUser } from "../../../controllers/hooks/use-user";
import {
  useConversations,
  useMessages,
} from "../../../controllers/hooks/use-messages";
import Navbar from "../../components/navbar";
import { IConversation } from "../../../types/types";

interface ConversationCardProps {
  conversation: IConversation;
}

const ConversationCard = ({ conversation }: ConversationCardProps) => {
  const userStyle = ({ isActive }: { isActive: boolean }) => {
    if (isActive) return "w-full bg-gray-200 h-[5.5rem] flex items-center px-5";
    return "w-full h-[5.5rem] flex items-center px-5 hover:bg-gray-100";
  };

  return (
    <NavLink to={`/`} className={userStyle}>
      <div className="h-1/2 aspect-square bg-black rounded-full" />
      <div className="flex flex-col p-3">
        <p className="">{conversation._id.buyerId}</p>
        <p className="font-thin text-[12px]">{conversation.latestMessage}</p>
      </div>
    </NavLink>
  );
};

const InboxPage = () => {
  const { user, isLoading, isLoggedIn } = useUser();
  const { conversations } = useConversations();

  console.log(conversations);
  // const { allMessages } = useMessages();

  const navigate = useNavigate();
  const outlet = useOutlet();

  if (isLoading) return <div>Loading</div>;

  if (!isLoggedIn) navigate("/login");

  return (
    <div className="w-screen h-screen">
      <header className="h-[10%]">
        <Navbar />
      </header>

      <div className="w-full h-[90%] flex">
        {/* Inbox container */}
        <div className="w-1/4 h-full border-r flex flex-col border-black border-opacity-20">
          <div className="w-full border-b p-3 text-center border-black border-opacity-20">
            Messages
          </div>
          <div className="py-2">
            {conversations.map((conversation, key) => (
              <ConversationCard key={key} conversation={conversation} />
            ))}
          </div>
        </div>
        <div className="w-1/2 h-full border-r">
          {outlet || (
            <div className="text-center font-light mt-5">
              No conversation selected
            </div>
          )}
        </div>
        <div className="w-1/4"></div>
      </div>
    </div>
  );
};

export default InboxPage;
