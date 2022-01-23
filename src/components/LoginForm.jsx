import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { PATH_NAME } from "../utils/constant";
import validator from "../utils/validator";
import CheckField from "./common/CheckField";
import TextFeild from "./common/TextFeild";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validator(data));
  }, [data]);

  const handleChange = target => {
    let value = target.value;
    if (typeof target.value === "string") {
      value = target.value.trim();
    }
    setData(prev => ({ ...prev, [target.name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
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
