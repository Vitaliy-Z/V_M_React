import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { userService } from "../services";
import { Loader } from "../components/common";

const UserContext = createContext();

export const useUsers = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    if (!error) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  async function getAllUsers() {
    try {
      const data = await userService.get();
      setAllUsers(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  }

  const getUserById = id => {
    return allUsers?.find(user => user._id === id);
  };

  return (
    <UserContext.Provider value={{ allUsers, getUserById }}>
      {!isLoading ? children : <Loader />}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default UserProvider;
