import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from "./Pages/Detail";
import AddMovie from "./Pages/AddMovie";
import Main from "./Pages/Main";
import MovieNavbar from "./Component/MovieNavbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MovieNavbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/addMovie" element={<AddMovie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
