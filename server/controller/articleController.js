import Article from "../model/articleModel.js";
import * as factory from "./handlerFactory.js";
import APIFeatures from "../utils/apiFeatures.js";
export const createArticle = factory.createOne(Article);
export const getArticle = factory.getOne(Article, {
  path: "likes dislikes comments reviewedBy relatedArticles",
  select: "name role",
});
export const getAllArticles = factory.getAll(Article);
export const updateArticle = factory.updateOne(Article);
export const deleteArticle = factory.deleteOne(Article);

export const getArticlesByType = async (req, res, next) => {
  try {
    console.log("article query", req.query);
    const { articleType, q, ...restQuery } = req.query;
    const baseQuery = articleType ? Article.find({ articleType }) : Article.find();

    const features = new APIFeatures(baseQuery, restQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    if (q) {
      const regex = new RegExp(q, "i");
      features.query = features.query.find({
        $or: [{ name: regex }, { sims_id: regex }],
      });
    }

    const articles = await features.query;

    res.status(200).json({
      status: "success",
      results: articles.length,
      data: articles,
    });
  } catch (err) {
    next(err);
  }
};
