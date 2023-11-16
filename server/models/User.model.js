const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'Email is alredy used'],
      trim: true
    },
    password: String,
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/dyxcgvfhb/image/upload/v1658393841/hottocode/8f1b09269d8df868039a5f9db169a772_nrx9vj.jpg'
    },
    bio: {
      type: String,
      default: 'Something here',
      maxlength: [500, 'Bio cant contain more than 500 characters']
    },
    role: {
      type: String,
      enum: ['USER', 'MODERATOR', 'ADMIN'],
      default: 'USER'
    },
    favSnippets: [{
      type: Schema.Types.ObjectId,
      ref: 'Snippet'
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
