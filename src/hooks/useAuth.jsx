import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { userService } from "../services";
import { singInEndpoint, singUpEndpoint } from "../services/config.json";

const AuthContext = createContext();
const httpClientAuth = axios.create();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const singUp = async ({ email, password, ...rest }) => {
    try {
      const data = await httpClientAuth.post(
        singUpEndpoint + process.env.REACT_APP_FIREBASE_KEY,
        {
          email,
          password,
          returnSecureToken: true
        }
      );
      await userService.create({
        _id: data.localId,
        email,
        password,
        ...rest
      });
      return data;
    } catch (error) {
      return error.response.data.error.message;
    }
  };
  const singIn = async ({ email, password }) => {
    try {
      const data = await httpClientAuth.post(
        singInEndpoint + process.env.REACT_APP_FIREBASE_KEY,
        {
          email,
          password,
          returnSecureToken: true
        }
      );
      return data;
    } catch (error) {
      return error.response.data.error.message;
    }
  };
  return (
    <AuthContext.Provider value={{ singIn, singUp }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default AuthProvider;
