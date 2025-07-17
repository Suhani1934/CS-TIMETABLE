import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FacultyHomePage from "./pages/faculty/HomePage";
import FacultyHome from "./pages/faculty/FacultyHome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FacultyHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
