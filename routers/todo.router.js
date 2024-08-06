const express = require("express");
const { v4: uuidv4 } = require("uuid");
const data = require("../database/data");
const router = express.Router();
const todoModel = require("../models/todo.model");

router
  .route("/")
  .get((req, res) => {
    const { userName } = req.userData;
    todoModel
      .find({})
      .then((todos) => res.json({ todos }))
      .catch((err) => res.json({ message: err.message }));
  })
  .post((req, res) => {
    let todos = req.body;
    const watch = new todoModel(todos);
    watch
      .save()
      .then((savedWatch) => res.status(201).json(savedWatch))
      .catch((err) => res.json({ message: err.message }));
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const todoById = await todoModel.findById(id);
    if (todoById) {
      res.json(todoById);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const updatedTodo = req.body;
    let todo = await todoModel.findById(id);
    if (todo) {
      Object.keys(updatedTodo).forEach((key) => {
        todo[key] = updatedTodo[key];
      });
      try {
        const watch = new todoModel(todo);
        const savedWatch = await watch.save();
        res.status(200).json({
          Message: "todo updated",
          todo: savedWatch,
        });
      } catch (err) {
        res.json({ message: err.message });
      }
    } else {
      res.status(404).json({ message: "todo not found" });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const findTodo = await todoModel.findById(id);
      const deleteTodo = await todoModel.deleteOne(findTodo);
      res.status(200).json({ message: "Product deleted", deleteTodo });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  });

module.exports = router;
