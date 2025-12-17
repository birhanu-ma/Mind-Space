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
import AdminPage from "./pages/AdminPage";
import MenteePage from "./pages/MenteePage";
import CounselorPage from "./pages/CounselorPage";
import ArticleCreateForm from "./features/Article/createArticle";
import ForumCreateForm from "./features/Forum/createForum";
import ServiceCreateForm from "./features/service/createService";
import CreateProfessionForm from "./features/profession/createProfession";
import UserDetail from "./features/user/userDetails";
import ArticleDetail from "./features/Article/articleDetails";
import ForumDetail from "./features/Forum/forumDetails";
import ServiceDetail from "./features/service/serviceDetails";
import ProfessionDetail from "./features/profession/professionDetals";
import PetitionDetail from "./features/admin/petitionDetail";
import ApplicationDetail from "./features/admin/counselor/ApplicationDetail";
import MenteeForm from "./features/admin/mentee/menteeForm";
import CounselorForm from "./features/counselor/counselorForms";
import CounselorDetail from "./features/counselor/counselorDetail";
import MenteeDetail from "./features/admin/mentee/rankedMenteeDetail";
import MenteeApplicationDetail from "./features/admin/mentee/menteeApplicationDetail";
import Profile from "./components/profile/profile"
import Settings from "./pages/SettingsPage";

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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/counselor" element={<CounselorPage />} />
          <Route path="/mentee" element={<MenteePage />} />
          <Route path="/admin/articles/new" element={<ArticleCreateForm />} />
          <Route path="/admin/forums/new" element={<ForumCreateForm />} />
          <Route path="/admin/services/new" element={<ServiceCreateForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          
          <Route
            path="/admin/professions/new"
            element={<CreateProfessionForm />}
          />
          <Route path="/user-detail/:id" element={<UserDetail />} />
          <Route path="/article-detail/:id" element={<ArticleDetail />} />
          <Route path="/forum-detail/:id" element={<ForumDetail />} />
          <Route path="/service-detail/:id" element={<ServiceDetail />} />
          <Route path="/profession-detail/:id" element={<ProfessionDetail />} />
          <Route path="/petition-detail/:id" element={<PetitionDetail />} />
          <Route
            path="/application-detail/:id"
            element={<ApplicationDetail />}
          />
          <Route
            path="/mentee-app-detail/:id"
            element={<MenteeApplicationDetail />}
          />
          <Route path="/register-as-mentee" element={<MenteeForm />} />
          <Route path="/register-as-counselor" element={<CounselorForm />} />
          <Route
            path="/counselors/:counselorId"
            element={<CounselorDetail />}
          />
          <Route path="/mentees/:menteeId" element={<MenteeDetail />} />
          <Route path="/apply-for-profession" element={<CounselorForm />} />
          <Route path="/apply-for-mentee" element={<MenteeForm />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
