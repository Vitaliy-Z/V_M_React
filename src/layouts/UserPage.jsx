import { orderBy } from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Loader } from "../components/Loaders";
import API from "../api";
import {
  UserInfoCard,
  UserMeetingsCard,
  UserQualitiesCard,
  UserListComments,
  UserComentForm
} from "../components/User";
import { PATH_NAME } from "../utils/constant";

const UserPage = () => {
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  const { userId } = useParams();
  const history = useHistory();
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  useEffect(() => {
    API.users.getById(userId).then(data => setUser(data));
    API.comments.fetchCommentsForUser(userId).then(data => setComments(data));
  }, []);

  const handleClickBtnEdit = () => {
    history.push(`${PATH_NAME.users}/${userId}/edit`);
  };

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
            profession={user.profession.name}
            rate={user.rate}
            onClick={handleClickBtnEdit}
          />
          <UserQualitiesCard qualities={user.qualities} />
          <UserMeetingsCard meetings={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <UserComentForm userId={user._id} setComments={setComments} />
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
