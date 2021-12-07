import React from "react";
const Counter = (props) => {
  const { name, value, id, onDelete, updateValue } = props;

  const formatValue = () => {
    return value === 0 ? "empty" : value;
  };
  const getBageClasses = () => {
    let classes = "badge m-2 ";
    classes += value === 0 ? "bg-warning" : "bg-primary";
    return classes;
  };

  return (
    <div>
      <span> {name}</span>
      <span className={getBageClasses()}>{formatValue()}</span>
      <button
        className="btn btn-primary btn-sm m-2"
        onClick={() => updateValue(id, "increment")}
      >
        +
      </button>
      <button
        className="btn btn-primary btn-sm m-2"
        onClick={() => {
          updateValue(id, "decrement");
        }}
      >
        -
      </button>
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Counter;
