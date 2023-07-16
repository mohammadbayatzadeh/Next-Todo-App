export const sortTodo = (todos) => {
  const sortedTodos = {};
  todos.map((todo) => {
    if (!sortedTodos[todo.status]) sortedTodos[todo.status] = [];
    sortedTodos[todo.status].push(todo);
  });
  return sortedTodos;
};
