import React from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { Loader } from "../components/Loaders";
import Qualitie from "../components/Qualitie";

function UserPage({ allUsers, onCheckBookmark, onDeleteUserBtn }) {
  const { userId } = useParams();
  const history = useHistory();
  const user = allUsers?.find(item => item._id === userId);

  return user ? (
    <div
      className="card mx-auto my-5 shadow-lg rounded"
      style={{ maxWidth: "640px" }}
    >
      <div className="row g-0">
        <div className="col-md-4 p-2 d-flex justify-content-center align-items-center">
          <img
            src="https://cdn.pixabay.com/photo/2019/02/19/19/45/thumbs-up-4007573_960_720.png"
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-8 ">
          <div className="card-body">
            <h5 className="card-title fs-1 text-uppercase text-decoration-underline">
              {user.name}
            </h5>
            <p className="card-text">
              Профессия: <i className="fw-bold">{user.profession.name}</i>
            </p>
            <p className="card-text">
              {user.qualities.map(item => (
                <Qualitie key={item._id} {...item} />
              ))}{" "}
            </p>
            <p className="card-text">
              Количество завершенных встреч:{" "}
              <i className="fw-bold">{user.completedMeetings}</i>
            </p>
            <p className="card-text">
              Рейтинг: <i className="fw-bold">{user.rate} / 5</i>{" "}
            </p>
            <div className="d-grid gap-2 col-6 ms-auto">
              <button
                className="btn btn-success"
                onClick={() => {
                  onCheckBookmark(user._id);
                }}
                id={user._id}
              >
                {user.bookmark ? "Удалить с избранных" : "Добавить в избранное"}
              </button>
              <button
                className="btn btn-danger"
                onClick={event => {
                  history.push("/users");
                  onDeleteUserBtn(event);
                }}
                id={user._id}
              >
                Удалить
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  history.push("/users");
                }}
              >
                Назад к списку
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

UserPage.propTypes = {
  allUsers: PropTypes.array,
  onCheckBookmark: PropTypes.func,
  onDeleteUserBtn: PropTypes.func
};

export default UserPage;
