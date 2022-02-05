import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { professionsService } from "../services";

const ProfessionContext = createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

const ProfessionProvider = ({ children }) => {
  const [allProfessions, setAllProfessions] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProfessions();
  }, []);
  useEffect(() => {
    if (!error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getAllProfessions() {
    try {
      const data = await professionsService.get();
      setAllProfessions(data);
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  const getProfessionById = id => {
    return allProfessions?.find(prof => prof._id === id);
  };

  return (
    <ProfessionContext.Provider value={{ allProfessions, getProfessionById }}>
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default ProfessionProvider;
