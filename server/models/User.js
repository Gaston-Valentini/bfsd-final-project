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
        phone: {
            type: String,
            default: "No especificado",
        },
        birthday: {
            type: String,
            default: "No especificado",
        },
        sport: {
            type: String,
            default: "No especificado",
        },
        image: {
            type: String,
            default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        },
        ubication: {
            type: String,
            default: "No especificado",
        },
        biography: {
            type: String,
            default: "Sin descripción",
            maxlength: 500,
        },
        following: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        followers: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        role: {
            type: String,
            default: "user",
        },
    },
    { timestamps: true }
);

export default model("User", User);
