import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
        type: String,
        required: [true, "Username area is required"],
        lowercase: true,
        validate: [validator.isAlphanumeric, "Only Alphanumeric characters"], // yalnızca rakamlar ve harflerden oluşsun  kontrolü.
    },
    email: {
        type: String,
        required: [true, "Email area is required"], // bu köşeli parantez yapısı şöyle çalışıyor : required : true fakat olmazsa bu mesajı döndür.
        unique: true,
        validate: [validator.isEmail, "Valid email is required"], // mailin geçerli olup olmadığını kontrol ediyoruz. 
    },
    password: {
        type: String,
        required: [true, "Password area is required"],
        minLength: [4, "At least 4 characters"],
    },
    followers: [
      {
        type:Schema.Types.ObjectId,
        ref: "Users"
      } 
    ],
    followings: [
      {
        type:Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
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