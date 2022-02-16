import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { singInEndpoint, ApiKeyFireBase } from "../services/config.json";
import axios from "axios";

const AuthContext = createContext();
const httpClientAuth = axios.create();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const singIn = async ({ email, password }) => {
    try {
      const data = await httpClientAuth.post(singInEndpoint + ApiKeyFireBase, {
        email,
        password,
        returnSecureToken: true
      });
      return data;
    } catch (error) {
      return error.response.data.error.message;
    }
  };
  return (
    <AuthContext.Provider value={{ singIn }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default AuthProvider;
