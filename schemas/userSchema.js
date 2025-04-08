import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  todos: [
    {
      type: Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const USER = model("User", userSchema);

export default USER;
