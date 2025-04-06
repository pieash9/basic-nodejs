import express from "express";
import TODO from "../schemas/todoSchema.js";
import checkLogin from "../middlewares/checkLogin.js";

const todoRouter = express.Router();

todoRouter.get("/", checkLogin, async (req, res) => {
  console.log(req.userId);
  console.log(req.username);
  try {
    const result = await TODO.find({
      status: "active",
    }).select({
      __v: 0,
      date: 0,
    });
    res.status(200).json({ message: "Successful", result });
  } catch (error) {
    res.status(500).send("There is server side error!");
  }
});

// // get active todos
// todoRouter.get("/active", async (req, res) => {
//   try {
//     const todo = new TODO();
//     const result = await todo.findActive();
//     res.status(200).json({ message: "Successful", result });
//   } catch (error) {
//     res.status(500).send("There is server side error!");
//   }
// });

// // get js todos
// todoRouter.get("/js", async (req, res) => {
//   try {
//     const result = await TODO.findByJs();
//     res.status(200).json({ message: "Successful", result });
//   } catch (error) {
//     res.status(500).send("There is server side error!");
//   }
// });

// // get by language todos
// todoRouter.get("/language", async (req, res) => {
//   try {
//     const result = await TODO.find().byLanguage("2");
//     res.status(200).json({ message: "Successful", result });
//   } catch (error) {
//     res.status(500).send("There is server side error!");
//   }
// });

// Get a todo by ID
todoRouter.get("/:id", async (req, res) => {
  try {
    const result = await TODO.findById(req.params.id);
    res.status(200).json({ message: "Successful", result });
  } catch (error) {
    res.status(500).send("There is server side error!");
  }
});

// POST todo
todoRouter.post("/", async (req, res) => {
  try {
    const newTodo = new TODO(req.body);

    await newTodo.save();
    res.status(200).json({
      message: "Todo added successfully",
    });
  } catch (error) {
    res.status(500).send("There is server side error!");
  }
});

// POST multiple todo
todoRouter.post("/all", async (req, res) => {
  try {
    await TODO.insertMany(req.body);
    res.status(200).json({
      message: "Todos added successfully",
    });
  } catch (error) {
    res.status(500).send("There is server side error!");
  }
});

// put todo
todoRouter.put("/:id", async (req, res) => {
  try {
    const result = await TODO.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
          ...req.body,
          status: "active",
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Todo updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).send("There is server side error!");
  }
});

// delete todo
todoRouter.delete("/:id", async (req, res) => {
  try {
    const result = await TODO.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Todo deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).send("There is server side error!");
  }
});

export default todoRouter;
