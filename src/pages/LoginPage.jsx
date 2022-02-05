import React from "react";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { PATH_NAME } from "../utils/constant";
import { LoginForm, RegisterForm } from "../components/forms";

const LoginPage = () => {
  const { type } = useParams();
  const history = useHistory();

  const replaceRegister = PATH_NAME.register.slice(1);
  if (type && type !== replaceRegister) {
    history.replace(PATH_NAME.login);
  }

  return (
    <div className="container mt-5 p-3 w-50 shadow">
      {type === replaceRegister ? <RegisterForm /> : <LoginForm />}
    </div>
  );
};

LoginPage.propTypes = {
  allProfessions: PropTypes.object
};

export default LoginPage;
