import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Menu from  "./pages/Menu";
import CustomOrder from "./pages/CustomOrder";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import "./App.css";
function App(){
  return(
    <Router>
      <ToastContainer position="bottom-right" autoClose={2000}/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/custom-order" element={<CustomOrder />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
export default App;
