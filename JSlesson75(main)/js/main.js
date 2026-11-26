import { getTodosFromLS } from "./storage.js";
import { renderTodos, initTodoHandlers } from "./dom.js";

const todos = getTodosFromLS() || [];

// -------
document.addEventListener("DOMContentLoaded", () => {
  renderTodos(todos);
  initTodoHandlers(todos);
});
