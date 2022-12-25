import Post from "../models/post";

export const addPost = async (req, res) => {
    try {
        const {_id} = req.user;
        //console.log(_id)
        const { title, description } = req.body;
        if(!title || !description) {
            return res.status(400).send("Title and description is required")
        }
        const post = await new Post({
            createdBy: _id,
            title,
            description
        }).save()
        return res.json({
            post
        })
        
    } catch (error) {
        //console.log(error)
        res.status(400).send("Post creation failed");
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
        .populate("createdBy", "-password")
        .populate("comments")
        .sort("-createdAt");
        
        res.json(posts);
    } catch (error) {
        //console.log(error)
        res.status(400).send("Fetching posts failed");
    }
}

export const getSinglePost = async (req, res) => {

    const { id } = req.params;

    try {
        const post = await Post.findById(id)
        .populate("createdBy", "-password")
        .populate("comments")
        .sort("-createdAt");

        res.json(post)
    } catch (error) {
        //console.log(error)
        res.status(400).send("Fetching post failed");
    }
}

export const updatePost = async (req, res) => {
    //console.log(req.user)
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndUpdate(
            id, 
            {
                ...req.body
            },
            {
                new: true
            }
        )
        res.json(post)
    } catch (error) {
        //console.log(error)
        res.status(400).send("Updating post failed");
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findOneAndDelete(id)
        res.json(post)
    } catch (error) {
        res.status(400).send("Deleting post failed");
    }
}