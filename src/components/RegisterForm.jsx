import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { PATH_NAME } from "../utils/constant";
import validator from "../utils/validator";
import { transformDataToFeild } from "../utils/helperFunctions";

import SelectField from "./common/SelectField";
import TextFeild from "./common/TextFeild";
import RadioField from "./common/RadioField";
import MultiSelectField from "./common/MultiSelectField";
import { Loader } from "./Loaders";
import API from "../api";
import CheckField from "./common/CheckField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});
  const [proffesions, setProffesions] = useState();
  const [qualities, setQualities] = useState();

  useEffect(() => {
    API.professions.fetchAll().then(data => {
      setProffesions(transformDataToFeild(data));
    });
    API.qualities.fetchAll().then(data => {
      setQualities(transformDataToFeild(data));
    });
  }, []);

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
      <h1>Регистация</h1>
      {proffesions ? (
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
          <SelectField
            label={"Выберете профессию"}
            name={"profession"}
            value={data.profession}
            onChange={handleChange}
            options={proffesions}
            error={errors.profession}
          />
          <RadioField
            label={"Ваш пол"}
            name={"sex"}
            value={data.sex}
            onChange={handleChange}
            options={[
              { label: "Мужской", value: "male" },
              { label: "Женский", value: "female" },
              { label: "Неопределенный", value: "other" }
            ]}
          />
          <MultiSelectField
            label={"Выберете качества"}
            name={"qualities"}
            options={qualities}
            onChange={handleChange}
            error={errors.qualities}
          />
          <CheckField
            name={"license"}
            value={data.license}
            onChange={handleChange}
            error={errors.license}
          >
            <span>
              Подтвердите <a href=" ">лицензию</a>
            </span>
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
      ) : (
        <Loader />
      )}
      <p className="text-muted mt-3 fst-italic d-flex flex-column align-items-center">
        У Вас есть аккаунт?
        <Link to={PATH_NAME.login} className="fst-normal btn btn-info btn-sm">
          Вход
        </Link>
      </p>
    </>
  );
};

RegisterForm.propTypes = {
  allProfessions: PropTypes.object
};

export default RegisterForm;
