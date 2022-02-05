import React from "react";
import PropTypes from "prop-types";
import { UserComent } from "./";

const UserListComments = ({ comments, handleClickBtnRemove }) => {
  const allUsers = [];

  if (comments?.length === 0) {
    return null;
  }

  return (
    <div className="card mb-3">
      <div className="card-body ">
        <h2>Все комментарии</h2>
        <hr />
        {comments.map(comment => {
          const ownerComment = allUsers?.find(u => u._id === comment.userId);
          return (
            ownerComment && (
              <UserComent
                key={comment._id}
                name={ownerComment?.name}
                time={comment.created_at}
                content={comment.content}
                handleClickBtnRemove={() => handleClickBtnRemove(comment._id)}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

UserListComments.propTypes = {
  comments: PropTypes.array,
  handleClickBtnRemove: PropTypes.func
};

export default UserListComments;
