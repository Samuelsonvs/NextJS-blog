import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        body: {
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
