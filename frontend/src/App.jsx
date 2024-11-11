import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contacat from "./pages/Contact";
import Myprofile from "./pages/Myprofile";
import Myappointments from "./pages/Myappointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />}></Route>
        <Route path="/doctors/:speciality" element={<Doctors />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacat />} />
        <Route path="/my-profile" element={<Myprofile />} />
        <Route path="/my-appointments" element={<Myappointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
