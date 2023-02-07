import { Route, Routes } from "react-router-dom";

import MainPage from "./view/pages/main-page/main-page";
import LoginPage from "./view/pages/login-page/login-page";
import InboxPage from "./view/pages/inbox-page/inbox-page";
import ConversationPage from "./view/pages/inbox-page/conversation-page";
import ShopPage from "./view/pages/shop-page/shop-page";
import CreateListingPage from "./view/pages/shop-page/create-listing-page";
import ListingPage from "./view/pages/shop-page/listing-page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inbox" element={<InboxPage />}>
        <Route path=":userId" element={<ConversationPage />} />
      </Route>
      <Route path="/shop" element={<ShopPage />}>
        <Route path="listings" element={<ListingPage />} />
        <Route path="new" element={<CreateListingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
