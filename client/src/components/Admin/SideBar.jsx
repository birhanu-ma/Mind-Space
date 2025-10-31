import React from "react";

function SideBar({
  setAddArticle,
  setUpdateArticles,
  setDashBoard,
  setExploreArticles,
  articleClicked,
  setArticleClicked,
}) {

const handleDelete = () => {
  const articleId = localStorage.getItem("articleId");
  const token = localStorage.getItem("accessToken");

  if (!articleId) {
    alert("No article selected for deletion.");
    return;
  }

  fetch(`http://127.0.0.1:8000/api/articles/${articleId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Article deleted successfully");
        localStorage.removeItem("articleId");
        setArticleClicked(false);
      } else {
        throw new Error("Failed to delete article");
      }
    })
    .catch((error) => console.error("Delete error:", error));
};

  return (
    <div>
      <div className="sm:w-[45%] sticky ">
        <div className="flex flex-row w-[80%] mt-5 mx-auto">
          <img src="" alt="" className="w-25 h-25 rounded-full border mr-5" />
          <div className="mt-5">
            <p>name</p>
            <p>role</p>
          </div>
        </div>
        <div className="w-[80%] mx-auto">
          <p className="shadow-md rounded  py-5 pl-6 m-auto">Manage users</p>
          <p className="shadow-md rounded  py-5 pl-6 m-auto">
            View forum posts
          </p>
          <p className="shadow-md  rounded py-5 pl-6 m-auto">
            Appointement summary
          </p>
          <div className="shadow-md rounded flex flex-wrap justify-around">
            <button
              onClick={() => {
                setAddArticle(false);
                setUpdateArticles(false);
                setDashBoard(true);
                setExploreArticles(false);
                setArticleClicked(false);
              }}
              className="shadow-md cursor-pointer  rounded py-5 my-3 px-3"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setAddArticle(false);
                setUpdateArticles(false);
                setDashBoard(false);
                setExploreArticles(true);
                setArticleClicked(false);
              }}
              className="shadow-md cursor-pointer rounded py-5  px-7 my-3"
            >
              Explore <br /> Article
            </button>
            <button
              onClick={() => {
                setAddArticle(true);
                setUpdateArticles(false);
                setDashBoard(false);
                setExploreArticles(false);
                setArticleClicked(false);
              }}
              className="shadow-md cursor-pointer  rounded py-5 my-3 px-3"
            >
              Add <br />
              New Article
            </button>

            {articleClicked && (
              <div className="">
                <button
                  onClick={() => {
                    setAddArticle(false);
                    setUpdateArticles(true);
                    setDashBoard(false);
                    setExploreArticles(false);
                    setArticleClicked(false);
                  }}
                  className="shadow-md mx-7 cursor-pointer rounded py-5  px-7 my-3"
                >
                  Update <br /> Article
                </button>

                <button
                  onClick={handleDelete}
                  className={`${
                    articleClicked ? "bg-red-600" : ""
                  } shadow-md cursor-pointer mx-7 rounded py-5  px-7 my-3`}
                >
                  Delete <br /> Article
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
