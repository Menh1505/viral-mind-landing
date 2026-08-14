import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Thanks from "@/pages/Thanks";
import Detail from "@/pages/Detail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/details/:slug" element={<Detail />} />
      </Routes>
    </Router>
  );
}
