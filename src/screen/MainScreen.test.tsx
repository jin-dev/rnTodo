/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import MainScreen from './MainScreen' // Import the component to be tested

// Mock your utility functions
jest.mock('../components/utility/expoAuth', () => ({
  onAuthenticate: jest.fn().mockResolvedValue(true), // Mock the authentication function
  checkHardware: jest.fn(),
}))

describe('MainScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<MainScreen />)

    // Assert that the component is rendered
    expect(getByText('ADD')).toBeTruthy()
    expect(getByPlaceholderText('Type your comment')).toBeTruthy()
  })

  it('adds a todo', async () => {
    const { getByText, getByPlaceholderText } = render(<MainScreen />)

    // Find the input field and add a text
    const input = getByPlaceholderText('Type your comment')
    fireEvent.changeText(input, 'New Todo Item')

    // Find and press the 'ADD' button
    const addButton = getByText('ADD')
    fireEvent.press(addButton)

    // Assert that the new todo item is added
    const newTodo = getByText('New Todo Item')
    expect(newTodo).toBeTruthy()
  })

  // Add more test cases for editing and deleting todos as needed
})
