/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
} from 'react-native'

import * as LocalAuthentication from 'expo-local-authentication'
import styled from 'styled-components/native'

interface TodoItem {
  id: number
  title: string
}
const TODOFlat = styled.FlatList`
  width: 100%;
  padding: 10px;
`

const Container = styled.View`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const TODOInput = styled.TextInput`
  width: 80%;
  margin: 10px;
  border-width: 2px;
  border-color: #000;
  height: 30px;
  border-radius: 6px;
  margin-bottom: 10px;
`

const TodoButton = styled.TouchableOpacity`
  background-color: #000;
  border-radius: 6px;
  width: 60%;
  align-items: center;
  margin-bottom: 40px;
  padding: 10px;
`

const TodoButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
`

const TodoView = styled.View`
  border: 1px solid #1e90ff;
  border-radius: 5px;
  margin-bottom: 12px;

  flex-direction: row;
  align-items: center;
`

const TodoText = styled.Text`
  color: black;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 700;
  flex: 1;
`

const MainScreen: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todoList, setTodoList] = useState<TodoItem[]>([])
  const [modifyTodo, setModifyTodo] = useState<TodoItem | null>(null)

  const [flag, setFlag] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function checkHardware() {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync()
      console.log('The compatible', compatible)
      setFlag(compatible)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    void checkHardware()
  }, [])

  function onAuthenticate() {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter Password',
    })
    void auth.then((result) => {
      setIsAuthenticated(result.success)
      //console.log(result)
    })
  }

  //insertion
  const addTodo = () => {
    if (todo === '') {
      return null
    }

    const newItem: TodoItem = {
      id: parseInt(Date.now().toString(), 10),
      title: todo,
    }
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

  const displayTodos = ({ item }: { item: TodoItem }) => {
    return (
      <TodoView>
        <TodoText>{item?.title}</TodoText>

        <Button title="edit" onPress={() => editTodo(item)} />
        <Button title="delete" onPress={() => delTodo(item?.id)} />
      </TodoView>
    )
  }

  return (
    <Container>
      <TODOInput
        placeholder="Type your comment11"
        value={todo}
        onChangeText={(input: string) => setTodo(input)}
      />
      {modifyTodo ? (
        <TodoButton onPress={() => updateTodo()}>
          <TodoButtonText>SAVE</TodoButtonText>
        </TodoButton>
      ) : (
        <TodoButton onPress={() => addTodo()}>
          <TodoButtonText>ADD1</TodoButtonText>
        </TodoButton>
      )}
      <TODOFlat data={todoList} renderItem={displayTodos} />
    </Container>
  )
}

export default MainScreen
