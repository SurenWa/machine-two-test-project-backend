const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
    title: {
        type: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now(), 
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true
    }
});

//export default mongoose.model("Comment", commentSchema);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;