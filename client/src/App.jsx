import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
