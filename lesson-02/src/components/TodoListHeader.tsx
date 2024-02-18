type TodoListHeaderPropsType = {
  title: string
}

export function TodoListHeader({title}: TodoListHeaderPropsType) {
  return <h3>{title}</h3>
}