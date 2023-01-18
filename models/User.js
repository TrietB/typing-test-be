const mongoose = require("mongoose");
const { Schema } = mongoose;

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
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "can't be blank"],
    //   match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      unique: true
    },
    password: {type: String, required: true, select: false},

    bio: String,
    image: String,

    history: historySchema,
  },
  { timestamps: true }
);

// userSchema.methods.toJSON = function () {
//   const user = this._doc;
//   delete user.password
//   return user
// };

const User = mongoose.model("Users", userSchema);

module.exports = User;
