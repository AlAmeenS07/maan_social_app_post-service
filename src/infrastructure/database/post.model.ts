import mongoose from "mongoose";


const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    url: {
      type: String,
      required: true
    }
  },

  { _id: false }
);

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

    links: {
      type: [linkSchema],
      default: []
    },

    mentions: {
      type: [String],
      default: [],
      index: true
    },

    hashtags: {
      type: [String],
      default: [],
      lowercase: true,
      index: true
    },

    is_listed: {
        type: Boolean,
        default: true
    },

    is_deleted: {
        type: Boolean,
        default: false
    }
  },

  {
    timestamps: true
  }
);

export const PostModel = mongoose.model("Post", postSchema);