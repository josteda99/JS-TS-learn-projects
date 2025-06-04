import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Movies } from "./components/Movies.tsx";
import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Footer.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route index path="/" element={<App />}></Route>
      <Route index path="/movies" element={<Movies programType="movie" />}></Route>
      <Route index path="/series" element={<Movies programType="series" />}></Route>
    </Routes>
    <Footer></Footer>
  </BrowserRouter>
);
