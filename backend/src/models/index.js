import mongoose from "mongoose";

const { Schema } = mongoose;

// Shared options: expose a numeric `id`, hide Mongo internals + password in JSON.
function schemaOptions(extra = {}) {
  return {
    strict: false, // keep any extra columns carried over from Supabase
    versionKey: false,
    toJSON: {
      virtuals: false,
      transform(_doc, ret) {
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
    ...extra,
  };
}

function withNumericId(schema) {
  // Disable Mongoose's default string `id` virtual so our numeric path wins.
  schema.set("id", false);
  return schema;
}

const userSchema = withNumericId(
  new Schema(
    {
      id: { type: Number, index: true, unique: true },
      email: { type: String, index: true },
      password: { type: String },
      user_name: { type: String, index: true },
      user_avatar: { type: String },
      created_at: { type: Date, default: Date.now },
    },
    schemaOptions(),
  ),
);

const postSchema = withNumericId(
  new Schema(
    {
      id: { type: Number, index: true, unique: true },
      userId: { type: Number, index: true },
      image: String,
      caption: String,
      share: { type: Number, default: 0 },
      created_at: { type: Date, default: Date.now },
    },
    schemaOptions(),
  ),
);

const storySchema = withNumericId(
  new Schema(
    {
      id: { type: Number, index: true, unique: true },
      userId: { type: Number, index: true },
      storyImage: String,
      created_at: { type: Date, default: Date.now },
    },
    schemaOptions(),
  ),
);

const messageSchema = withNumericId(
  new Schema(
    {
      id: { type: Number, index: true, unique: true },
      fromUser: { type: Number, index: true },
      toUser: { type: Number, index: true },
      message: String,
      seen_time: { type: Date, default: null },
      created_at: { type: Date, default: Date.now },
    },
    schemaOptions(),
  ),
);

const followerSchema = withNumericId(
  new Schema(
    {
      id: { type: Number, index: true, unique: true },
      followerId: { type: Number, index: true },
      followingId: { type: Number, index: true },
      status: { type: String, default: "requested" }, // requested | accepted
      created_at: { type: Date, default: Date.now },
    },
    schemaOptions(),
  ),
);

const likeSchema = withNumericId(
  new Schema(
    {
      id: { type: Number, index: true, unique: true },
      postId: { type: Number, index: true },
      userId: { type: Number, index: true },
      created_at: { type: Date, default: Date.now },
    },
    schemaOptions(),
  ),
);

const commentSchema = withNumericId(
  new Schema(
    {
      id: { type: Number, index: true, unique: true },
      postId: { type: Number, index: true },
      userId: { type: Number, index: true },
      comment: String,
      created_at: { type: Date, default: Date.now },
    },
    schemaOptions(),
  ),
);

export const User = mongoose.model("User", userSchema, "userMetadata");
export const Post = mongoose.model("Post", postSchema, "posts");
export const Story = mongoose.model("Story", storySchema, "stories");
export const Message = mongoose.model("Message", messageSchema, "messages");
export const Follower = mongoose.model("Follower", followerSchema, "followers");
export const Like = mongoose.model("Like", likeSchema, "likes");
export const Comment = mongoose.model("Comment", commentSchema, "comments");
