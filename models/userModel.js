import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => { // 2.parametre saltOrRounds değeri ne kadar büyük olursa o kadar karmaşık bir şifre oluşturulur.
        user.password = hash;
        next(); // kodun devamının çalışması için de nextledik.
    })
})

const User = mongoose.model("User", userSchema); 

export default User