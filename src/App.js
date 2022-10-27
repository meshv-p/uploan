import "./App.css";
import { Navbar } from "./Compo/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/404_NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/folder/:folderId" element={<Home />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="*" element="error" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
