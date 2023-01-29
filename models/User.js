const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require('jsonwebtoken')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

//
const historySchema = new Schema({
  test: [
    {
      level: Number,
      score: Number,
      attempt: Number,
    },
  ],
  lesson: [String],
  game: [
    {
      level: Number,
      time: Number,
      attempt: Number,
    },
  ],
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "must not be empty"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      // index: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],//ab@ac.i2
      // index: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "can't be blank"],
      // match: [/\S+@\S+\.\S+/, "is invalid"],
      // index: true,
      unique: true
    },
    password: {type: String, required: true, select: false},

    bio: String,
    image: String,

    history: historySchema,
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.password
  return user
};

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({_id: this._id}, JWT_SECRET_KEY,{
    expiresIn: '1d',
  })
  return accessToken
}

const User = mongoose.model("Users", userSchema);

module.exports = User;
