import React from "react";
import PropTypes from "prop-types";
import { Badge } from "../common";
import { useQualities } from "../../hooks/useQualities";

const UserQualitiesCard = ({ qualities }) => {
  const { getQualityById } = useQualities();
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Качества</span>
        </h5>
        <p className="card-text">
          {qualities.map(qualityId => (
            <Badge key={qualityId} {...getQualityById(qualityId)} />
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
