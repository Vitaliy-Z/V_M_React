import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { PAGE_SIZE, VALUES_OF_TH } from "../../utils/constant";
import { UserOfList } from "../user";
import { Pagination } from "../common";
import { IconSort } from "../icons";

const UsersList = ({ users, setSortBy, sortBy }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const cropUsers = _.slice(
    users,
    PAGE_SIZE * currentPage - PAGE_SIZE,
    PAGE_SIZE * currentPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

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
            {VALUES_OF_TH.map((value, indx) =>
              value.data ? (
                <th
                  onClick={handleSortUsers}
                  data-sort={value.data}
                  scope="col"
                  key={indx}
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
                <th
                  className={indx === 1 && "w-25"}
                  // style={indx === 1 && { width: "30%" }}
                  scope="col"
                  key={indx}
                >
                  {value.name}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {cropUsers.map((user, indx) => (
            <UserOfList key={user._id} indx={indx} {...user} />
          ))}
        </tbody>
      </table>
      <Pagination
        countItems={users.length}
        currentPage={currentPage}
        onChangePage={setCurrentPage}
      />
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  setSortBy: PropTypes.func,
  sortBy: PropTypes.object
};

export default UsersList;
