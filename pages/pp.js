import comments from "@/lib/commentSchema";
import connectDB from "@/lib/mongodb";

export default function Pp({ allComment }) {
    console.log(allComment);
    return <div></div>;
}

export async function getServerSideProps() {
    await connectDB();

    /* find all the data in our database */
    const allComment = await comments.find({});

    return { props: { allComment: JSON.parse(JSON.stringify(allComment)) } };
}
