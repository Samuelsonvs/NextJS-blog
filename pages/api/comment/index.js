import comments from "@/lib/commentSchema";
import connectDB from "@/lib/mongodb";

export default async function handler(req, res) {
    await connectDB();
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                console.log("get");
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const newEntry = new comments({
                    name: "samuel",
                    city: "city",
                    owner: "samy",
                });
                await newEntry.save();
                return res.status(200).json(newEntry);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }

    return res.status(200).json("bug");
}
