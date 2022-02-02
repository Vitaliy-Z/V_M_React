import React from "react";
import PropTypes from "prop-types";
import { transformTime } from "../../utils/helperFunctions";

const UserComent = ({ name, time, content, handleClickBtnRemove }) => {
  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={`https://avatars.dicebear.com/api/avataaars/${name}.svg`}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 fw-bold">
                    {name}
                    <span className="small fw-light ms-1">
                      {transformTime(Number(time))}
                    </span>
                  </p>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={handleClickBtnRemove}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small fst-italic mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserComent.propTypes = {
  name: PropTypes.string,
  time: PropTypes.string,
  content: PropTypes.string,
  handleClickBtnRemove: PropTypes.func
};

export default UserComent;
