import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { qualitiesService } from "../services";

const QualityContext = createContext();

export const useQualities = () => {
  return useContext(QualityContext);
};

const QualityProvider = ({ children }) => {
  const [allQualities, setAllQualities] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllQualities();
  }, []);
  useEffect(() => {
    if (!error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getAllQualities() {
    try {
      const data = await qualitiesService.get();
      setAllQualities(data);
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  const getQualityById = id => {
    return allQualities?.find(quality => quality._id === id);
  };

  return (
    <QualityContext.Provider value={{ allQualities, getQualityById }}>
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default QualityProvider;
