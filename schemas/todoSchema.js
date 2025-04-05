import { model, Schema } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// instance methods
todoSchema.methods = {
  findActive: function () {
    return model("Todo").find({ status: "active" });
  },
};
const TODO = model("Todo", todoSchema);

export default TODO;
