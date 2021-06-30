import comments from "@/db/commentSchema";
import connectDB from "@/db/mongodb";

export default async (req, res) => {
    await connectDB();
    const allComment = await comments.find({});

    res.json(allComment);
};
