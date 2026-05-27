import mongoose from "mongoose";


const postSchema = new mongoose.Schema(

  {
    userId: {
      type: String,
      required: true,
      index: true
    },

    content: {
      type: String,
      trim: true,
    },

    media: {
      type: [String],
      default: []
    },

    hashtags: {
      type: [String],
      default: [],
      lowercase: true,
      index: true
    },

    isListed: {
        type: Boolean,
        default: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
  },

  {
    timestamps: true
  }
);

export const PostModel = mongoose.model("Post", postSchema);