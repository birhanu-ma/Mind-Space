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
export const getArticleDetails = factory.getOne(Article);
export const reviewArticles = factory.updateOne(Article);

export const getArticlesByType = async (req, res, next) => {
  try {
    const { articleType, q, ...restQuery } = req.query;

    // Only fetch articles with articleType
    const baseQuery = articleType ? Article.find({ articleType }) : Article.find();


    const features = new APIFeatures(baseQuery, restQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // Optional search by header or subHeader
    if (q) {
      const regex = new RegExp(q, "i");
      features.query = features.query.find({
        $or: [{ header: regex }, { subHeader: regex }],
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

