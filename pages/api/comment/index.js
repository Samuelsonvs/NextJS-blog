import comments from "@/lib/commentSchema";
import connectDB from "@/lib/mongodb";

export default async (req, res) => {
    await connectDB();
    const allComment = await comments.find({});

    res.json(allComment);
};
