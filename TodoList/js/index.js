"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  isCompleted: "isCompleted",
};

const todos = [];

const errTodo = (todoId) => {
  return `Todo with id ${todoId} not found`;
};

const getNewTodoId = (todos) => {
  return (
    todos.reduce((maxId, todo) => {
      return Math.max(maxId, todo[todoKeys.id]);
    }, 0) + 1
  );
};

const createTodo = (todo, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.isCompleted]: false,
  };
  todo.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);
  if (todo === undefined) {
    console.error(errTodo(todoId));
    return null;
  }
  todo[todoKeys.isCompleted] = !todo[todoKeys.isCompleted];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodo(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};

const todoEditText = (todos, todoId, todoText) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);
  if (todo === undefined) {
    console.error(errTodo(todoId));
    return null;
  }

  todo[todoKeys.text] = todoText;

  return todo;
};

// createTodo(todos, "Study")
// completeTodoById(todos, 1)
// deleteTodoById(todos, 1)
// todoEditText(todos, 1, "Homework")
