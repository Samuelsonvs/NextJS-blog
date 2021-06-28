import comments from "@/lib/commentSchema";
import connectDB from "@/lib/mongodb";

export default async function handle(req, res) {
    const subject = req.url.split("/").pop();
    await connectDB();
    if (req.method === "GET") {
        const cmnt = await comments.find({ subject });
        return res.json(cmnt);
    }

    const { name } = req.body.status.user;
    if (name) {
        try {
            if (req.method === "POST") {
                const newEntry = new comments({
                    name,
                    subject,
                    body: (req.body.body || "").slice(0, 500),
                });

                await newEntry.save();
                return res.status(200).json(newEntry);
            }
        } catch (err) {
            return res.status(400).json(err);
        }
    } else {
        return res.status(201).json("error");
    }
}
