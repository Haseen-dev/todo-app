const moment = require("moment");
const Todo = require("../models/Todo");

const homeController = async (req, res, next) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.locals.xyz = moment;
    res.render("index", { title: "List todo", todos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addTodoFormController = (req, res, next) => {
  try {
    res.render("newTodo", { title: "New todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodoFormController = async (req, res, next) => {
  try {
    const { id } = req.query;
    const todo = await Todo.findById(id);
    res.render("updateTodo", { title: "Update todo", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodoFormController = (req, res, next) => {
  try {
    const { id } = req.query;
    res.render("deleteTodo", { title: "Delete todo", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodoController = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    if (!title) {
      res.status(400).json({ message: "please include title" });
    }
    const newTodo = new Todo({ title: title, desc: desc });
    await newTodo.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodoController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.title = title;
    todo.desc = description;

    await todo.save();
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodoController = async (req, res, next) => {
  try {
    const { id, confirm } = req.query;
    if (confirm === "yes") {
      await Todo.findByIdAndDelete(id);
    }
    res.redirect('/')
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  homeController,
  addTodoFormController,
  updateTodoFormController,
  deleteTodoFormController,
  addTodoController,
  updateTodoController,
  deleteTodoController
};
