import React, { Component } from "react";

class SingleTodo extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      text,
      completed,
      id,
      editText,
      editMode,
      handleTodoComplete,
      handleTodoDelete,
      handleChangeEditId,
      handleChangeEditText,
      handleSaveEdit,
      cancelEdit,
    } = this.props;

    const customClassName = completed
      ? "form-control line-thru"
      : "form-control";

    return (
      <>
        {editMode ? (
          <div className="input-group mb-1">
            <span className="input-group-text">
              <input
                id={id}
                checked={completed}
                type="checkbox"
                onChange={(e) => handleTodoComplete(e.target.checked, id)}
              />
            </span>
            <input
              disabled={!editMode}
              value={editText}
              type="text"
              className={customClassName}
              onChange={handleChangeEditText}
            />
            <button
              onClick={() => handleSaveEdit(id)}
              className="btn btn-success"
              type="button"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="btn btn-danger"
              type="button"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="input-group mb-1">
            <span className="input-group-text">
              <input
                id={id}
                checked={completed}
                type="checkbox"
                onChange={(e) => handleTodoComplete(e.target.checked, id)}
              />
            </span>
            <input
              disabled={!editMode}
              type="text"
              className={customClassName}
              value={text}
            />
            <button
              onClick={() => handleChangeEditId(id)}
              className="btn btn-secondary "
              type="button"
            >
              Edit
            </button>
            <button
              onClick={() => handleTodoDelete(id)}
              className="btn btn-danger"
              type="button"
            >
              Delete
            </button>
          </div>
        )}
      </>
    );
  }
}

export default SingleTodo;
