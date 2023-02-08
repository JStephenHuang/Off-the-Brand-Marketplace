import { useParams } from "react-router-dom";

const ConversationPage = () => {
  const params = useParams();

  return (
    <div className="flex flex-col text-center font-light mt-5">
      {params.userId}
    </div>
  );
};

export default ConversationPage;
