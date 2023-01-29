const mongoose = require("mongoose");
const { Schema } = mongoose;

const paragraphSchema = new Schema(
  {
    type: [
      {
        String,
        required: true,
        lowercase: true,
        enum: ["lesson", "typing-test", "paragraph"],
      },
    ],
    key: [String],
    level: Number,
    content: [String],
  },
  { timestamps: true }
);

const Paragraph = mongoose.model("Paragraph", paragraphSchema);

module.exports = Paragraph;
