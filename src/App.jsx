import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Result from "./features/Result";
import AboutUs from "./pages/AboutUs";
import Hero from "./components/Hero/Hero";
import { useSelector } from "react-redux";
import "./App.css";

function App() {
  const userId = useSelector((state) => state.auth);

  // const isIq = useSelector((state) => state.categoryMarks);
  // const isRais = useSelector((state) => state.raisecMarks);

  // const [isTestSubmitted, setIsTestSubmitted] = useState(false);

  //to prevent the user to directly jump to /result if test is not given
  // useEffect(() => {
  //   if (isIq.isIq || isRais.isRais) setIsTestSubmitted(true);
  // }, [isIq, isRais]);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path={`/result/${userId}`} element={<Result />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
