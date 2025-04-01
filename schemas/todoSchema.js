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

// static methods
todoSchema.statics = {
  findByJs: function () {
    return this.find({ title: /js/i });
  },
};

// query helpers
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") });
  },
};

const TODO = model("Todo", todoSchema);

export default TODO;
