import comments from "@/lib/commentSchema";
import connectDB from "@/lib/mongodb";

export default async function handle(req, res) {
    const method = req.method;
    const subject = req.url.split("/").pop();
    await connectDB();

    if (method === "GET") {
        const cmnt = await comments.find({ subject });
        return res.json(cmnt);
    }

    if (method === "DELETE") {
        console.log(JSON.parse(req.body).status);
    }

    const status = req.body.status || "";
    if (status) {
        try {
            switch (method) {
                case "POST":
                    const name = status.user.name;
                    const newEntry = new comments({
                        name,
                        subject,
                        body: (req.body.body || "").slice(0, 500),
                    });

                    await newEntry.save();
                    res.status(200).json(newEntry);
                    break;
                case "DELETE":
                    const parsedStatus = JSON.parse(status);
                    const del = "delete";
                    console.log(parsedStatus);
                    res.status(200).json(del);
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
