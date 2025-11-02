import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar.jsx";

import Analysis from "../features/mentee/menteeAnalysis.jsx";
import MentorSidebar from "../features/mentee/mentee-info.jsx";
import Petition from "../features/mentee/petition.jsx";
import { useLocation } from "react-router-dom";


import MenteeChat from "../features/chat/MenteeChat.jsx";



const Mentee = () => {

  const location = useLocation();
  const [activePage, setActivePage] = useState("Analysis");
  useEffect(() => {
    if (location.state?.currentPage) {
      setActivePage(location.state.currentPage);
    }
  }, [location.state]);
  return (
    <>
      <div className="flex w-full pt-20">
        <Sidebar
          title="Mentee"
          navItems={["Analysis", "Petition", "Message"]}
          activePage={activePage}
          setActivePage={(page) => setActivePage(page)}
        />

        <div className="flex-1 flex flex-col m-5">
       

          <div className="flex flex-row flex-1 w-full">
            <div className="flex-1 flex flex-col bg-background text-foreground m-1">
          

              {activePage === "Petition" && <Petition />}
              {activePage === "Message" && <MenteeChat />}

              {!["Home", "Petition", "Message"].includes(activePage) && (
                <Analysis />
              )}
            </div>
            <div className="w-[200px] min-w-[120px] max-w-[300px]   flex flex-col p-4">
              {activePage === "Analysis" && <MentorSidebar />}

              {activePage === "Petition" && <MentorSidebar />}
            </div>
        
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentee;
