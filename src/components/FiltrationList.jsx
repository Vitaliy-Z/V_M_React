import React from "react";
import PropTypes from "prop-types";

export default function FiltrationList({
  items,
  valueProp = "_id",
  contentProp = "name",
  onItemSelect,
  selectedItem,
  onReset
}) {
  return (
    <div>
      <ul className="list-group">
        {Object.keys(items).map(item => (
          <li
            className={
              "list-group-item" +
              (items[item][contentProp] === selectedItem ? " active" : "")
            }
            key={items[item][valueProp]}
            onClick={() => {
              onItemSelect(items[item][contentProp]);
            }}
            role={"button"}
          >
            {items[item][contentProp]}
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
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  valueProp: PropTypes.string,
  contentProp: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  selectedItem: PropTypes.oneOfType([
    PropTypes.oneOf([undefined]),
    PropTypes.string
  ])
};
