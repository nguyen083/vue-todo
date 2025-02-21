import type { Todo } from '@/types'

function stringToDate(str: string): Date {
  const [time, date] = str.split(' ')
  const [day, month, year] = date.split('/').map(Number)
  const [hours, minutes, seconds] = time.split(':').map(Number)

  // Create a Date object (months in JavaScript are 0-based)
  return new Date(year, month - 1, day, hours, minutes, seconds)
}
function sortByCreatedAt(arr: Todo[], sortByCreatedAtASC: boolean) {
  arr.sort((a, b) => {
    const dateA = stringToDate(a.createdAt)
    const dateB = stringToDate(b.createdAt)
    if (!sortByCreatedAtASC)
      return dateA.getTime() - dateB.getTime() // So sánh số mili giây
    else return dateB.getTime() - dateA.getTime()
  })
}

function getAllAndSort(sortByCreatedAtASC: boolean): Todo[] {
  const todos: Todo[] = getAll()
  sortByCreatedAt(todos, sortByCreatedAtASC)
  return todos
}

function getAll(): Todo[] {
  const stringTodo = localStorage.getItem('todo')
  let todos: Todo[] = []
  if (stringTodo) todos = JSON.parse(stringTodo)
  else todos = []
  return todos
}
function saveTodo(todos: Todo[]) {
  localStorage.setItem('todo', JSON.stringify(todos))
}

export function getTodos(sortByCreatedAtASC?: boolean): Todo[] {
  if (sortByCreatedAtASC !== undefined) {
    return getAllAndSort(sortByCreatedAtASC)
  } else {
    return getAll()
  }
}

export function createTodo(title: string): Todo {
  const todos = getAll()
  let maxId: number = 0
  todos.forEach((element) => {
    maxId = element.id > maxId ? element.id : maxId
  })
  const todo: Todo = {
    id: maxId + 1,
    title,
    checked: false,
    createdAt: new Date().toLocaleString('vi-VN'),
  }
  todos.push(todo)
  saveTodo(todos)
  return todo
}

export function updateTodo(params: { id: number; checked: boolean }): Todo | undefined {
  const todos = getAll()
  const i = todos.find((element) => element.id === params.id) as Todo
  i.checked = params.checked
  saveTodo(todos)
  // console.log('đã save')
  return i
}

export function deleteTodo(id: number) {
  const todos = getAll()
  const todosNew = todos.filter((element) => element.id !== id)
  saveTodo(todosNew)
}
