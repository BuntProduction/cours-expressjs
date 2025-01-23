import { TodoModel } from "../schemas.js";

export const TodoRepository = {
  create: async (data) => {
    const newTodo = new TodoModel(data);
    const savedTodo = await newTodo.save();
    console.log(savedTodo);
  },
  findAll: async () => {
    return await TodoModel.find();
  },
};
