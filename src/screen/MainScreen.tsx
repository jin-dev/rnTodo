/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
} from 'react-native'

interface TodoItem {
  id: number
  title: string
}

const MainScreen: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todoList, setTodoList] = useState<TodoItem[]>([])
  const [modifyTodo, setModifyTodo] = useState<TodoItem | null>(null)

  //insertion
  const addTodo = () => {
    if (todo === '') {
      return null
    }

    const newItem: TodoItem = { id: 1 + 1, title: todo }
    setTodoList([...todoList, newItem])
    setTodo('')
  }

  const editTodo = (todo: TodoItem) => {
    setModifyTodo(todo)
    setTodo(todo?.title || '')
  }

  const updateTodo = () => {
    const updatedTodoList = todoList.map((item) => {
      const tempId = modifyTodo?.id || null

      if (modifyTodo && item.id === tempId) {
        return { ...item, title: todo }
      }
      return item
    })
    setTodoList(updatedTodoList)
    setModifyTodo(null)
    setTodo('')
  }

  //Deletion
  const delTodo = (id: number) => {
    const filterTodoList = todoList.filter((todo) => todo.id !== id)

    setTodoList(filterTodoList)
  }

  const displayTodos = ({ item, index }: { item: TodoItem; index: number }) => {
    return (
      <View>
        <Text>{item?.title}</Text>

        <Button title="edit" onPress={() => editTodo(item)} />
        <Button title="delete" onPress={() => delTodo(item?.id)} />
      </View>
    )
  }

  return (
    <View style={{}}>
      <TextInput
        style={{}}
        placeholder="Type your comment"
        value={todo}
        onChangeText={(input) => setTodo(input)}
      />
      {modifyTodo ? (
        <TouchableOpacity style={{}} onPress={() => updateTodo()}>
          <Text style={{}}>SAVE</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{}} onPress={() => addTodo()}>
          <Text style={{}}>ADD</Text>
        </TouchableOpacity>
      )}
      <Text>Main Screen haha</Text>
      <FlatList data={todoList} renderItem={displayTodos} />
    </View>
  )
}

export default MainScreen
