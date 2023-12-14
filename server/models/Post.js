import { Schema, model } from "mongoose";

const Post = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: String,
        likes: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
                text: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

export default model("Post", Post);
