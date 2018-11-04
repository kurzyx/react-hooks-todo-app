import React, { useState, useEffect, useRef } from 'react';

export default function TodoListItem(props) {
  const {
    label,
    completed,
    onLabelChange,
    onCompletedToggle,
    onRemove
  } = props;
  const [editing, setEditing] = useState(false);
  const editInputRef = useRef();
  const toggleInputRef = useRef();

  // Focus the edit input after the state has changed to editing.
  useEffect(
    () => {
      if (editing) {
        editInputRef.current.focus();
      }
    },
    [editing]
  );

  function handleDoubleClick(e) {
    if (e.nativeEvent.target !== toggleInputRef.current) {
      setEditing(true);
    }
  }

  function handleCompletedToggle() {
    onCompletedToggle();
  }

  function handleLabelChange(e) {
    onLabelChange(e.nativeEvent.target.value);
  }

  function handleBlur() {
    setEditing(false);
  }

  function handleKeyPress(e) {
    if (e.nativeEvent.keyCode === 13) {
      setEditing(false);
    }
  }

  return (
    <li
      className={[
        editing ? 'editing' : undefined,
        completed ? 'completed' : undefined
      ].join(' ')}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          ref={toggleInputRef}
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={handleCompletedToggle}
        />
        <label>{label}</label>
        <button className="destroy" onClick={onRemove} />
      </div>
      <input
        ref={editInputRef}
        className="edit"
        value={label}
        onChange={handleLabelChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      />
    </li>
  );
}
