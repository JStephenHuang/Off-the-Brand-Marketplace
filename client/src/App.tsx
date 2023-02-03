import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/main-page/MainPage";
import LoginPage from "./pages/login-page/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
