
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./pages/Home"
import Learn from "./pages/Learn"
import Tool from "./pages/Tool"
import Community from "./pages/Community"
import Support from "./pages/Support"
import Contact from "./pages/Contact"
import About from "./pages/About"
import LearnDetail from "./pages/LearnDetail"
import ForumDetail from "./pages/ForumDetail"
import Appointement from "./components/Appointment/Appointement";
import MoodHistory from "./components/MoodTracker/MoodHistory";
import Navbar from "./components/Navbar";
import Register from "./components/RegisterForm/Register";
import NewForum from "./components/CreartForum.jsx/NewForum";
import UserSection from "./components/UserDashboard/UserSection";
import AdminSection from "./components/Admin/AdminSection";
import LoginForm from "./components/Login/LoginForm";
import CounselorSection from "./components/Counselor/CounselorSection";
import Forum from "./components/UserDashboard/Forum";



function App() {
  return (

    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />}/>
          <Route path="/tool" element={<Tool />}/>
          <Route path="/community" element={<Community />}/>
          <Route path="/support" element={<Support />}/>
          <Route path="/aboutus" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/learn/:id" element={<LearnDetail />}/>
          <Route path="/community/:id" element={<ForumDetail/>}/>
          <Route path="/support/appointment/:id" element={<Appointement/>}/>
          <Route path="/Tool/moodHistory/:id" element={<MoodHistory/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/newforum" element={<NewForum/>}/>
          <Route path="/userdashboard" element={<UserSection />} />
          <Route path="/adminsection" element={<AdminSection />} />
          <Route path="/loginform" element={<LoginForm />} />
           <Route path="/counselorsection" element={<CounselorSection />} />
           <Route path="/forum" element={<Forum />} />


        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
