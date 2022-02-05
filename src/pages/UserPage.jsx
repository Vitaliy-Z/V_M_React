import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import API from "../api";
import { useUsers } from "../hooks/useUsers";
import { Loader } from "../components/common";
import {
  UserInfoCard,
  UserMeetingsCard,
  UserQualitiesCard,
  UserListComments,
  UserComentForm
} from "../components/user";

const UserPage = () => {
  const { userId } = useParams();
  const { getUserById } = useUsers();
  const user = getUserById(userId);
  const [comments, setComments] = useState([]);
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  const handleClickBtnRemove = id => {
    API.comments
      .remove(id)
      .then(id => setComments(prev => prev.filter(c => c._id !== id)));
  };

  if (!user) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserInfoCard
            name={user.name}
            profession={user.profession}
            rate={user.rate}
          />
          <UserQualitiesCard qualities={user.qualities} />
          <UserMeetingsCard meetings={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <UserComentForm />
          <UserListComments
            comments={sortedComments}
            handleClickBtnRemove={handleClickBtnRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
