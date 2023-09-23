# TODO app with expo Auth

This is a simple TODO app built with React Native.<br>
It allows you to add, edit, and delete tasks in your todo list.<br>Additionally, it incorporates authentication features to ensure the security of your tasks.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

---

## Prerequisites[](#prerequisites)

Before you begin, ensure you have met the following requirements:

1. Node.js and npm installed on your development machine.
2. Expo CLI installed globally (npm install -g expo-cli).
3. An emulator or a physical device for testing the app.
4. make sure there is PIN code on your device or emulator.

--

## Installation[](#installation)

1. clone this proejct
2. navigate to the project directory
3. install the required dependencies:

```
yarn
```

## Usage[](#usage)

to run this TODO app on your development,

- start the Expo development(Android)

```
yarn android // for android
yarn ios //for iOS
```

## Features [](#features)

- Authentication: Before adding, editing, or deleting tasks, the app ensures user authentication to maintain task security.

- Add Task: You can add a new task by entering the task description in the input field and clicking the "ADD" button.

- Edit Task: To edit a task, click the "edit" button next to the task, make your changes, and click the "SAVE" button.

- Delete Task: To delete a task, click the "delete" button next to the task.

- Task List: The app displays your task list using a FlatList component.
