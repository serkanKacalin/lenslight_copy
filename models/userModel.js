import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
{
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
},
{
    timestamps: true, // mongoose veri tabanında bizim adımıza created at ve updated at adında iki alan ekler.
}
);

const User = mongoose.model("User", userSchema); 

export default User