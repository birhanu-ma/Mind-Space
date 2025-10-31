import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Tool from "./pages/Tool";
import Community from "./pages/Community";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LearnDetail from "./pages/LearnDetail";
import MoodHistory from "./components/tools/MoodHistory";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/RegisterForm/Register";
import LoginForm from "./components/auth/Login/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/tool" element={<Tool />} />
          <Route path="/community" element={<Community />} />
          <Route path="/support" element={<Support />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learn/:id" element={<LearnDetail />} />
          <Route path="/Tool/moodHistory/:id" element={<MoodHistory />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
