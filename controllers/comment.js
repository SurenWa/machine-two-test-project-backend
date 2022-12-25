import Comment from "../models/comment";

export const addComment = async (req, res) => {
    try {
        const {_id} = req.user;
        //console.log(_id)
        const { title, postId } = req.body;
        if(!title) {
            return res.status(400).send("Title is required")
        }
        const comment = await new Comment({
            createdBy: _id,
            title,
            post: postId
        }).save()
        return res.json({
            comment
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).send("Comment creation failed");
    }
}