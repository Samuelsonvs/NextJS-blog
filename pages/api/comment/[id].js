import comments from "@/db/commentSchema";
import connectDB from "@/db/mongodb";

export default async function handle(req, res) {
    const method = req.method;
    const subject = req.url.split("/").pop();
    await connectDB();

    if (method === "GET") {
        const cmnt = await comments.find({ subject });
        return res.json(cmnt);
    }

    const name =
        req.body.status?.user.name || JSON.parse(req.body).status.user.name;

    if (name) {
        try {
            switch (method) {
                case "POST":
                    const newEntry = new comments({
                        name,
                        subject,
                        body: (req.body.body || "").slice(0, 500),
                    });

                    await newEntry.save();
                    res.status(200).json(newEntry);
                    break;
                case "DELETE":
                    const comment = await comments.findById(
                        JSON.parse(req.body).id
                    );
                    await comment.remove();
                    res.status(200).json("Comment has been removed");
                    break;
                default:
                    res.status(200).json("Undefined method");
                    break;
            }
        } catch (err) {
            console.log("inside error");
            return res.status(400).json(err);
        }
    } else {
        return res.status(201).json("error");
    }
}
