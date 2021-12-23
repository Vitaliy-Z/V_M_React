import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { PAGE_SIZE } from "../utils/constant";

export default function Pagination({ countItems, currentPage, onChangePage }) {
  const paginationItems = _.range(1, _.ceil(countItems / PAGE_SIZE) + 1);

  if (paginationItems.length === 1) {
    return null;
  }

  return (
    <nav className="d-flex" style={{ cursor: "pointer" }}>
      <ul className="pagination mx-auto">
        <li className="page-item">
          <span
            className="page-link"
            onClick={() => {
              if (currentPage > 1) {
                onChangePage(currentPage - 1);
              }
            }}
          >
            &laquo;
          </span>
        </li>

        {paginationItems.map(item => (
          <li
            className={"page-item " + (item === currentPage ? "active" : "")}
            key={item}
          >
            <span className="page-link" onClick={() => onChangePage(item)}>
              {item}
            </span>
          </li>
        ))}

        <li className="page-item">
          <span
            className="page-link"
            onClick={() => {
              if (currentPage < paginationItems.length) {
                onChangePage(currentPage + 1);
              }
            }}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  countItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired
};
