import React from "react";
import PropTypes from "prop-types";

export default function FiltrationList({
  items,
  selectedItem,
  valueProp = "_id",
  contentProp = "name",
  onItemSelect,
  onReset
}) {
  return (
    <div>
      <ul className="list-group">
        {items.map(item => (
          <li
            className={
              "list-group-item" +
              (item[valueProp] === selectedItem ? " active" : "")
            }
            key={item[valueProp]}
            onClick={() => {
              onItemSelect(item[valueProp]);
            }}
            role={"button"}
          >
            {item[contentProp]}
          </li>
        ))}
      </ul>
      <button
        className="btn btn-info m-2"
        onClick={onReset}
        role={"button"}
        key={"button-reset"}
      >
        Сброс
      </button>
    </div>
  );
}

FiltrationList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueProp: PropTypes.string,
  contentProp: PropTypes.string,
  onItemSelect: PropTypes.func,
  onReset: PropTypes.func,
  selectedItem: PropTypes.oneOfType([
    PropTypes.oneOf([undefined]),
    PropTypes.string
  ])
};
