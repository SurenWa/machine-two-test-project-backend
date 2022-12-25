import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
    },    
    description: {
        type: String,
        required: true,
        min: 50,
        max: 640,
    },
    createdAt: { 
        type: Date, 
        default: Date.now(), 
        required: true 
    },
    //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],  
});

//populate comments
postSchema.virtual("comments", {
    ref: "Comment",
    foreignField: "post",
    localField: "_id",
  });

export default mongoose.model("Post", postSchema);