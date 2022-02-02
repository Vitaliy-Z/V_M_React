import React from "react";
import PropTypes from "prop-types";

const UserQualitiesCard = ({ qualities }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Качества</span>
        </h5>
        <p className="card-text">
          {qualities.map(q => (
            <span className={`badge bg-${q.color} me-1`} key={q._id}>
              {q.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

UserQualitiesCard.propTypes = {
  qualities: PropTypes.array
};

export default UserQualitiesCard;
