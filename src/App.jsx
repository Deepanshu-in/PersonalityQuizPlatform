import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Result from "./features/Result";
import AboutUs from "./pages/AboutUs";
import Hero from "./components/Hero/Hero";
import { useSelector } from "react-redux";
import "./App.css";
import QuizComponent from "./components/QuizComponents/QuizComponent";

function App() {
  const userId = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/iqTest" element={<QuizComponent />} />
          <Route path="/eqTest" element={<QuizComponent />} />
          <Route path={`/result/${userId}`} element={<Result />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
