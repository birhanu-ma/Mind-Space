import { useState, useEffect } from "react";
import Students from "../features/user/Students.jsx";
import Sidebar from "../components/layout/Sidebar.jsx";
import ApplicationList from "../features/admin/ApplicationList.jsx";
import Petition from "../features/admin/Petition.jsx";
import Article from "../features/Article/article.jsx";
import Forum from "../features/Forum/forum.jsx";
import Service from "../features/service/service.jsx";
import Profession from "../features/profession/profession.jsx";
function StudentUnion() {
  const navItems = [
    "Users",
    "Article",
    "Forum",
    "Service",
    "Profession",
    "Application",
    "Petition",
  ];

  const [activePage, setActivePage] = useState("Dashboard");
  useEffect(() => {
    if (location.state?.currentPage) {
      setActivePage(location.state.currentPage);
    }
  }, [location.state]);
  const renderContent = () => {
    switch (activePage) {
      case "Users":
        return <Students />;
      case "Article":
        return <Article />;
      case "Forum":
        return <Forum />;
      case "Service":
        return <Service />;
      case "Profession":
        return <Profession />;
          case "Application":
        return <ApplicationList />;
      case "Petition":
        return <Petition />;
      default:
        return <Students />;
    }
  };
  return (
    <div className="flex flex-1 pt-20">
      <Sidebar
        title="Admin"
        navItems={navItems}
        activePage={activePage}
        setActivePage={setActivePage}
        className=""
      />
      <div className="flex-1  py-2 px-5 overflow-y-auto bg-background text-foreground border border-border rounded-lg">
        {renderContent(activePage)}
      </div>
    </div>
  );
}

export default StudentUnion;
