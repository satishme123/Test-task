import "./App.css";
import { Route, Routes } from "react-router-dom";
import TableView from "./TableView";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<TableView />} />
      </Routes>
    </div>
  );
}

export default App;
