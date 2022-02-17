import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { PATH_NAME } from "../../utils/constant";
import validator from "../../utils/validator";
import {
  changeHandlerInput,
  setTokensToLocalStorage,
  transformDataToFeild
} from "../../utils/helperFunctions";
import {
  TextFeild,
  SelectField,
  MultiSelectField,
  RadioField,
  CheckField,
  Loader
} from "../common";
import { useProfessions } from "../../hooks/useProfessions";
import { useQualities } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const history = useHistory();
  const { singUp } = useAuth();
  const [data, setData] = useState({
    _id: uuidv4(),
    name: "",
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    completedMeetings: 0,
    rate: 5,
    bookmark: false,
    license: false,
    remember: false
  });
  const [errors, setErrors] = useState({});

  const { allProfessions } = useProfessions();
  const { allQualities } = useQualities();

  useEffect(() => {
    setErrors(validator(data));
  }, [data]);

  const handleChange = ({ name, value }) =>
    changeHandlerInput(setData, name, value);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(data);
    const response = await singUp(data);
    if (typeof response === "string") {
      console.log("~ resERROR", response);
      toast.error(response); // Не работает toast
    } else {
      console.log("~ resSUCCESS", response);
      if (data.remember) {
        setTokensToLocalStorage(response);
      }
      history.push(PATH_NAME.main);
    }
  };

  if (!allProfessions || !allQualities) {
    return <Loader />;
  }

  return (
    <>
      <h1>Регистация</h1>

      <form action="">
        <TextFeild
          label={"Ваше имя"}
          name={"name"}
          placeholder={"Иван Иванов"}
          value={data.name}
          error={errors.name}
          onChange={handleChange}
        />
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
          options={transformDataToFeild(allProfessions)}
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
          options={transformDataToFeild(allQualities)}
          onChange={handleChange}
          error={errors.qualities}
          defaultValue={data.qualities}
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
        <CheckField
          name={"remember"}
          value={data.remember}
          onChange={handleChange}
        >
          <span>Оставаться в сети</span>
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
