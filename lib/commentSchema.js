import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const comments =
    mongoose.models.comments ||
    mongoose.model("comments", commentSchema, "comments");

export default comments;
