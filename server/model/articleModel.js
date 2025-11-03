import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: [true, "Header is required"],
      trim: true,
    },
    subHeader: String,
    list: String,
    img: String,

    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],

    comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],

    active: { type: Boolean, default: false },
    reviewedBy: { type: mongoose.Schema.ObjectId, ref: "User" },

    relatedArticles: [{ type: mongoose.Schema.ObjectId, ref: "Article" }],

    articleType: {
      type: String,
      enum: ["main", "related"],
      default: "main",
    },

    category: String,
    tags: [{ type: String }],
  },
  { timestamps: true }
);

articleSchema.index({ category: 1, active: 1 });

const Article = mongoose.model("Article", articleSchema);
export default Article;
