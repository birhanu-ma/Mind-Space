import Article from "../model/articleModel.js";
import * as factory from "./handlerFactory.js";

export const createArticle = factory.createOne(Article);
export const getArticle = factory.getOne(Article, {
  path: "likes dislikes comments reviewedBy relatedArticles",
  select: "name role",
});
export const updateArticle = factory.updateOne(Article);
export const deleteArticle = factory.deleteOne(Article);
