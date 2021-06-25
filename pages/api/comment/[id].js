//import comments from "@/lib/commentSchema";

export default async function handle(req, res) {
    const status = req.body.status;
    if (status) {
        console.log(status);
    } else {
        console.log("not signin");
    }
    //   const { login, email } = req.session;
    //   const entry = JSON.parse((await redis.hget('guestbook', id)) || 'null');

    //   if (req.method === 'GET') {
    //     const { email, ...restOfEntry } = entry;

    //     return res.json(restOfEntry);
    //   }

    //   if (req.method === 'DELETE') {
    //     if (!login || login !== entry.created_by) {
    //       return res.status(403).send('Unauthorized');
    //     }

    //     await redis.hdel('guestbook', id);
    //     return res.status(204).json({});
    //   }

    //   if (req.method === 'PUT') {
    //     if (!login || login !== entry.created_by) {
    //       return res.status(403).send('Unauthorized');
    //     }

    //     const updated = {
    //       id,
    //       email,
    //       updated_at: Date.now(),
    //       body: (req.body.body || '').slice(0, 500),
    //       created_by: login
    //     };

    //     await redis.hset('guestbook', id, JSON.stringify(updated));
    //     return res.status(201).json(updated);
    //   }

    return res.status(201).json(status);
}
