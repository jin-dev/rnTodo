interface TodoItem {
  id: number
  title: string
}
interface TodoState {
  todo: string
  todoList: TodoItem[]
  modifyTodo: TodoItem | null
}

export { TodoItem, TodoState }
