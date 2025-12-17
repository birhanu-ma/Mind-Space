import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Learn = lazy(() => import("./pages/Learn"));
const Tool = lazy(() => import("./pages/Tool"));
const Community = lazy(() => import("./pages/Community"));
const Support = lazy(() => import("./pages/Support"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const LearnDetail = lazy(() => import("./pages/LearnDetail"));
const MoodHistory = lazy(() => import("./components/tools/MoodHistory"));
const Register = lazy(() => import("./components/auth/RegisterForm/Register"));
const LoginForm = lazy(() => import("./components/auth/Login/LoginForm"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const MenteePage = lazy(() => import("./pages/MenteePage"));
const CounselorPage = lazy(() => import("./pages/CounselorPage"));
const ArticleCreateForm = lazy(() => import("./features/Article/createArticle"));
const ForumCreateForm = lazy(() => import("./features/Forum/createForum"));
const ServiceCreateForm = lazy(() => import("./features/service/createService"));
const CreateProfessionForm = lazy(() => import("./features/profession/createProfession"));
const UserDetail = lazy(() => import("./features/user/userDetails"));
const ArticleDetail = lazy(() => import("./features/Article/articleDetails"));
const ForumDetail = lazy(() => import("./features/Forum/forumDetails"));
const ServiceDetail = lazy(() => import("./features/service/serviceDetails"));
const ProfessionDetail = lazy(() => import("./features/profession/professionDetals"));
const PetitionDetail = lazy(() => import("./features/admin/petitionDetail"));
const ApplicationDetail = lazy(() => import("./features/admin/counselor/ApplicationDetail"));
const MenteeForm = lazy(() => import("./features/admin/mentee/menteeForm"));
const CounselorForm = lazy(() => import("./features/counselor/counselorForms"));
const CounselorDetail = lazy(() => import("./features/counselor/counselorDetail"));
const MenteeDetail = lazy(() => import("./features/admin/mentee/rankedMenteeDetail"));
const MenteeApplicationDetail = lazy(() => import("./features/admin/mentee/menteeApplicationDetail"));
const Profile = lazy(() => import("./components/profile/profile"));
const Settings = lazy(() => import("./pages/SettingsPage"));

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
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
            <Route path="/admin/professions/new" element={<CreateProfessionForm />} />
            <Route path="/user-detail/:id" element={<UserDetail />} />
            <Route path="/article-detail/:id" element={<ArticleDetail />} />
            <Route path="/forum-detail/:id" element={<ForumDetail />} />
            <Route path="/service-detail/:id" element={<ServiceDetail />} />
            <Route path="/profession-detail/:id" element={<ProfessionDetail />} />
            <Route path="/petition-detail/:id" element={<PetitionDetail />} />
            <Route path="/application-detail/:id" element={<ApplicationDetail />} />
            <Route path="/mentee-app-detail/:id" element={<MenteeApplicationDetail />} />
            <Route path="/register-as-mentee" element={<MenteeForm />} />
            <Route path="/register-as-counselor" element={<CounselorForm />} />
            <Route path="/counselors/:counselorId" element={<CounselorDetail />} />
            <Route path="/mentees/:menteeId" element={<MenteeDetail />} />
            <Route path="/apply-for-profession" element={<CounselorForm />} />
            <Route path="/apply-for-mentee" element={<MenteeForm />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
