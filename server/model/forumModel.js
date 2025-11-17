import mongoose from "mongoose";

const forumShema = new mongoose.Schema(
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

    relatedForums: [{ type: mongoose.Schema.ObjectId, ref: "Forum" }],

    forumType: {
      type: String,
      enum: ["mental", "motivation"],
      default: "mental",
    },

    category: String,
    tags: [{ type: String }],
  },
  { timestamps: true }
);

forumShema.index({ category: 1, active: 1 });

const Forum = mongoose.model("Forum", forumShema);
export default Forum;
