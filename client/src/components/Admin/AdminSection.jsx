import React,{useState} from "react";
import AdminProfile from "./AdminProfile";
import AddArticles from "./AddArticles";
import UpdateArticles from "./UpdateArticles";
import SideBar from "./SideBar";
import ExploreArticles from "./ExploreArticles";

function AdminSection() {
  const [addArticle, setAddArticle] = useState(false);
  const [updateArticles, setUpdateArticles] = useState(false);
  const [dashBoard, setDashBoard] = useState(true);
  const [exploreArticles, setExploreArticles] = useState(false);
  const [articleClicked, setArticleClicked] = useState(false);

  return (
    <div className="m-15 mb-40 sm:relative">
      <SideBar
        setAddArticle={setAddArticle}
        setUpdateArticles={setUpdateArticles}
        setDashBoard={setDashBoard}
        setExploreArticles = {setExploreArticles}
        articleClicked = {articleClicked}
        setArticleClicked = {setArticleClicked}
      />

      {dashBoard && <AdminProfile />}

      {addArticle && <AddArticles />}

      {updateArticles && <UpdateArticles />}
      {exploreArticles && <ExploreArticles setArticleClicked = {setArticleClicked} />}
    </div>
  );
}

export default AdminSection;
