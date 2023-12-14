import { Schema, model } from "mongoose";

const User = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: Number,
        birthday: Date,
        sport: String,
        image: String,
        ubication: String,
        biography: {
            type: String,
            maxlength: 500,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export default model("User", User);
