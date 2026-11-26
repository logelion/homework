export const getTodosFromLS = () => {
  return JSON.parse(localStorage.getItem("todos"));
};

export const setTodosToLS = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
