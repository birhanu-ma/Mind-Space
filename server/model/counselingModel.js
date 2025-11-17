import mongoose from "mongoose";

const counselingSchema = new mongoose.Schema({
  counselor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Counselor is required"],
  },
  mentee: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Mentee is required"],
  },
  reviewedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ["scheduled", "in-progress", "completed", "cancelled"],
    default: "scheduled",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


counselingSchema.index({ mentee: 1 }, { unique: true });

counselingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "counselor",
    select: "name sims_id major year",
  }).populate({
    path: "mentee",
    select: "name sims_id major year status",
  });

  next();
});

counselingSchema.statics.getCounselingStats = async function (filter = {}) {
  // Convert counselor ID to ObjectId if provided as string
  if (filter.counselor && typeof filter.counselor === "string") {
    filter.counselor = new mongoose.Types.ObjectId(filter.counselor);
  }

  // Base pipeline to expand mentees
  const menteePipeline = [
    { $match: filter },
    { $unwind: "$mentee" },
    {
      $lookup: {
        from: "users",
        localField: "mentee",
        foreignField: "_id",
        as: "menteeInfo",
      },
    },
    { $unwind: "$menteeInfo" },
  ];

  // Count mentees by department (major)
  const menteeDepartmentCounts = await this.aggregate([
    ...menteePipeline,
    {
      $group: { _id: "$menteeInfo.major", count: { $sum: 1 } },
    },
  ]);

  // Count mentees by year
  const menteeYearCounts = await this.aggregate([
    ...menteePipeline,
    {
      $group: { _id: "$menteeInfo.year", count: { $sum: 1 } },
    },
  ]);

  // Count mentees by role (handle missing roles)
  const menteeRoleCounts = await this.aggregate([
    ...menteePipeline,
    {
      $group: {
        _id: { $ifNull: ["$menteeInfo.role", "unknown"] },
        count: { $sum: 1 },
      },
    },
  ]);

  // Count mentees by active/inactive status
  const activeInactiveCounts = await this.aggregate([
    ...menteePipeline,
    {
      $group: { _id: "$menteeInfo.active", count: { $sum: 1 } },
    },
  ]);

  return {
    menteeRoleCounts,
    menteeDepartmentCounts,
    menteeYearCounts,
    activeInactiveCounts,
  };
};

const Counseling = mongoose.model("Counseling", counselingSchema);
export default Counseling;
