import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name"]
    },
    age: {
      type: Number,
      required: [true, "Please enter your age"]
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please enter your password"]
    },
    token: {
      type: String
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
