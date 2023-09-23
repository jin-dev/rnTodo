/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Button, FlatList } from 'react-native'
import { onAuthenticate, checkHardware } from '../components/utility/expoAuth'
import styled from 'styled-components/native'
import { TodoItem, TodoState } from '../type/types'

// css with styled-components
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
  width: 380px;
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
  // State to manage the TODO data
  const [todoState, setTodoState] = useState<TodoState>({
    todo: '', // input for new TODO item
    todoList: [], //List of TODO items
    modifyTodo: null, // The item being edited
  })

  useEffect(() => {
    // Check hardware capabilities when the component mounts
    void checkHardware()
  }, [])

  //Fuction to handle user authentication(PIN code)
  //user must have PIN code before using this app
  const handleAuthentication = async () => {
    try {
      const result = await onAuthenticate()
      return result
    } catch (error) {
      console.error('Authentication error:', error)
      return false
    }
  }

  //add a new TODO item
  const addTodo = async () => {
    const isAuthenticated = await handleAuthentication()
    if (!isAuthenticated || todoState.todo === '') {
      console.log('Authentication failed or empty todo')
      return
    }

    //Create a new item and update the state
    const newItem: TodoItem = {
      id: parseInt(Date.now().toString(), 10),
      title: todoState.todo,
    }
    setTodoState({
      ...todoState,
      todoList: [...todoState.todoList, newItem],
      todo: '', //Clear the input
    })
  }

  //Function to edit a item
  const editTodo = async (todo: TodoItem) => {
    const isAuthenticated = await handleAuthentication()
    if (isAuthenticated) {
      setTodoState({ ...todoState, modifyTodo: todo, todo: todo?.title || '' })
    }
  }

  //Function to update an edited item
  const updateTodo = () => {
    const updatedTodoList = todoState.todoList.map((item) => {
      const tempId = todoState.modifyTodo?.id || null

      if (todoState.modifyTodo && item.id === tempId) {
        return { ...item, title: todoState.todo }
      }
      return item
    })
    setTodoState({
      ...todoState,
      todoList: updatedTodoList,
      modifyTodo: null,
      todo: '', //Clear the input
    })
  }

  //Function to delte a item
  const delTodo = async (id: number) => {
    const isAuthenticated = await handleAuthentication()
    if (isAuthenticated) {
      //Filter out the item with the id
      const filterTodoList = todoState.todoList.filter((todo) => todo.id !== id)
      setTodoState({ ...todoState, todoList: filterTodoList })
    }
  }

  //Function to display itmes
  const displayTodos = ({ item }: { item: TodoItem }) => (
    <TodoView>
      <TodoText>{item?.title}</TodoText>
      <Button title="edit" onPress={() => editTodo(item)} />
      <Button title="delete" onPress={() => delTodo(item?.id)} />
    </TodoView>
  )

  return (
    <Container>
      <TODOInput
        placeholder="Type your comment"
        value={todoState.todo}
        onChangeText={(input: string) =>
          setTodoState({ ...todoState, todo: input })
        }
      />
      {todoState.modifyTodo ? (
        <TodoButton onPress={() => updateTodo()}>
          <TodoButtonText>SAVE</TodoButtonText>
        </TodoButton>
      ) : (
        <TodoButton onPress={() => addTodo()}>
          <TodoButtonText>ADD</TodoButtonText>
        </TodoButton>
      )}
      <FlatList
        data={todoState.todoList}
        renderItem={displayTodos}
        keyExtractor={(item) => item.id.toString()}
      />
    </Container>
  )
}

export default MainScreen
