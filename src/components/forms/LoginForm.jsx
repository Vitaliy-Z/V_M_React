import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { PATH_NAME, TOKEN_KEY } from "../../utils/constant";
import { changeHandlerInput } from "../../utils/helperFunctions";
import validator from "../../utils/validator";
import { CheckField, TextFeild } from "../common";

const LoginForm = () => {
  const history = useHistory();
  const { singIn } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validator(data));
  }, [data]);
  const handleChange = ({ name, value }) =>
    changeHandlerInput(setData, name, value);
  const setTokensToLocalStorage = ({
    idToken,
    refreshToken,
    expiresIn = 3600
  }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY.token, idToken);
    localStorage.setItem(TOKEN_KEY.refreshToken, refreshToken);
    localStorage.setItem(TOKEN_KEY.expires, expiresDate);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await singIn(data);
    if (typeof response === "string") {
      console.log("~ resERROR", response);
      // toast(response); // Не работает toast
    } else {
      setTokensToLocalStorage(response);
      history.push(PATH_NAME.main);
    }
  };

  return (
    <>
      <h1>Вход</h1>
      <form action="">
        <TextFeild
          label={"Электроння почта"}
          type={"email"}
          name={"email"}
          placeholder={"e-mail@mail.com"}
          value={data.email}
          error={errors.email}
          onChange={handleChange}
        />

        <TextFeild
          label={"Пароль"}
          type={"password"}
          name={"password"}
          value={data.password}
          error={errors.password}
          onChange={handleChange}
        />
        <CheckField
          name={"remember"}
          value={data.remember}
          onChange={handleChange}
        >
          <span>Запомнить меня</span>
        </CheckField>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!(Object.keys(errors).length === 0)}
          className="btn btn-primary d-block w-75 mt-4 mb-4 m-auto"
        >
          Отправить
        </button>
      </form>
      <p className="text-muted fst-italic d-flex flex-column align-items-center">
        У Вас нету аккаунта?
        <Link
          to={PATH_NAME.login + PATH_NAME.register}
          className="fst-normal btn btn-info btn-sm"
        >
          Регистрация
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
