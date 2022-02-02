import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { UserOfShowedContext } from "../context";
import { PAGE_SIZE, VALUES_OF_TH } from "../utils/constant";
import { UserOfList } from "./User";
import Pagination from "./Pagination";
import IconSort from "./IconSort";

export default function UsersList({ setSortBy, sortBy }) {
  const { usersOfShowed } = useContext(UserOfShowedContext);

  const [currentPage, setCurrentPage] = useState(1);

  const cropUsers = _.slice(
    usersOfShowed,
    PAGE_SIZE * currentPage - PAGE_SIZE,
    PAGE_SIZE * currentPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [usersOfShowed]);

  const handleSortUsers = ({ currentTarget }) => {
    const dataSortBy = currentTarget.dataset.sort;
    if (dataSortBy === sortBy.itr) {
      setSortBy(prevState => ({
        ...prevState,
        order: prevState.order === "asc" ? "desc" : "asc"
      }));
    } else {
      setSortBy({ itr: dataSortBy, order: "asc" });
    }
  };

  return (
    <div className="container p-0">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {VALUES_OF_TH.map((value, ind) =>
              value.data ? (
                <th
                  onClick={handleSortUsers}
                  data-sort={value.data}
                  scope="col"
                  key={ind}
                >
                  {value.name}
                  {value.data === sortBy.itr ? (
                    <IconSort orders={sortBy.order === "asc" ? "down" : "up"} />
                  ) : (
                    <span style={{ color: "transparent" }}>
                      <IconSort />
                    </span>
                  )}
                </th>
              ) : (
                <th className={ind === 2 ? "w-25" : " "} scope="col" key={ind}>
                  {value.name}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {cropUsers.map((user, indx) => (
            <UserOfList key={user._id + user.name} indx={indx} id={user._id} />
          ))}
        </tbody>
      </table>
      <Pagination
        countItems={usersOfShowed.length}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />
    </div>
  );
}

UsersList.propTypes = {
  setSortBy: PropTypes.func,
  sortBy: PropTypes.object
};
