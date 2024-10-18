import React, { Component } from "react";
import "./App.css";
import "./components/SingleTodo";
import SingleTodo from "./components/SingleTodo";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editId: null,
      newTodoText: "",
      editText: "",
      todos: {
        1: {
          text: "Todo 1",
          completed: false,
        },
        2: {
          text: "Todo 2",
          completed: false,
        },
        3: {
          text: "Todo 3",
          completed: false,
        },
      },
    };
  }
  handleAddTodo = () => {
    const { todos, newTodoText } = this.state;
    if (newTodoText.trim() === "") return;
    console.log(todos);
    const newId = Date.now();
    const newTodos = JSON.parse(JSON.stringify(todos));
    const newTodo = {
      ...newTodos,
      [newId]: { text: newTodoText, completed: false },
    };
    this.setState({ todos: newTodo, newTodoText: "" });
  };

  handleInputChange = (e) => {
    this.setState({ newTodoText: e.target.value });
  };
  handleTodoComplete = (completeStatus, todoId) => {
    const { todos } = this.state;
    const newTodos = JSON.parse(JSON.stringify(todos));
    newTodos[todoId].completed = completeStatus;
    this.setState({ todos: newTodos });
  };
  handleTodoDelete = (todoId) => {
    const { todos } = this.state;
    const newTodos = JSON.parse(JSON.stringify(todos));
    delete newTodos[todoId];
    this.setState({ todos: newTodos });
  };
  handleChangeEditId = (todoId) => {
    const { todos } = this.state;
    this.setState({ editId: todoId, editText: todos[todoId].text });
  };
  handleChangeEditText = (e) => {
    this.setState({ editText: e.target.value });
  };
  handleSaveEdit = (todoId) => {
    const { todos, editText } = this.state;
    const newTodos = JSON.parse(JSON.stringify(todos));

    newTodos[todoId].text = editText;
    this.setState({ todos: newTodos, editId: null, editText: "" });
  };
  cancelEdit = () => {
    this.setState({ editId: null, editText: "" });
  };
  render() {
    const { todos, editId, newTodoText } = this.state;
    return (
      <div className="wrapper">
        <h1>Todo List App - DOM</h1>
        <div className="input-group mb-3">
          <input
            value={newTodoText}
            onChange={this.handleInputChange}
            type="text"
          />
          <button
            onClick={this.handleAddTodo}
            id="add-todo"
            className="btn btn-primary"
            type="button"
          >
            Add Todo
          </button>
        </div>
        <main>
          {Object.entries(todos).map(([key, value]) => {
            const editMode = editId == key;
            return (
              <SingleTodo
                key={key}
                {...value}
                id={key}
                editMode={editMode}
                handleTodoComplete={this.handleTodoComplete}
                handleTodoDelete={this.handleTodoDelete}
                handleChangeEditId={this.handleChangeEditId}
                handleChangeEditText={this.handleChangeEditText}
                handleSaveEdit={this.handleSaveEdit}
                cancelEdit={this.cancelEdit}
              />
            );
          })}
        </main>
      </div>
    );
  }
}
