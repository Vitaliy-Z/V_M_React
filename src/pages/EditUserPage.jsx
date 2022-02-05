import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  RadioField,
  SelectField,
  MultiSelectField,
  TextFeild,
  Loader
} from "../components/common";
import { useUsers } from "../hooks/useUsers";
import { useProfessions } from "../hooks/useProfessions";
import { useQualities } from "../hooks/useQualities";
import {
  changeHandlerInput,
  transformDataToFeild
} from "../utils/helperFunctions";
import validator from "../utils/validator";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();

  const [user, setUser] = useState();
  const [errors, setErrors] = useState();

  const { getUserById } = useUsers();
  const { allProfessions, getProfessionById } = useProfessions();
  const { allQualities, getQualityById } = useQualities();

  useEffect(() => {
    setUser(getUserById(userId));
  }, []);

  useEffect(() => {
    setErrors(validator(user));
  }, [user]);

  const handleChange = ({ name, value }) =>
    changeHandlerInput(setUser, name, value);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(user);
    history.goBack();
  };

  if (!user || !allProfessions || !allQualities) {
    return <Loader />;
  }

  return (
    <div className="container mt-5 p-3 w-50 shadow">
      <TextFeild
        label={"Имя"}
        name={"name"}
        value={user.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextFeild
        label={"Электронная почта"}
        name={"email"}
        value={user.email}
        onChange={handleChange}
        error={errors.email}
      />
      <SelectField
        label={"Выберете свою профессию"}
        name={"profession"}
        defaultValue={{
          value: getProfessionById(user.profession)._id,
          label: getProfessionById(user.profession).name
        }}
        options={transformDataToFeild(allProfessions)}
        onChange={handleChange}
        error={errors.professions}
      />
      <RadioField
        label={"Ваш пол"}
        name={"sex"}
        value={user.sex}
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
        defaultValue={user.qualities.map(qualityId => {
          const quality = getQualityById(qualityId);
          return { value: quality._id, label: quality.name };
        })}
        options={transformDataToFeild(allQualities)}
        onChange={handleChange}
        error={errors.qualities}
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={!(Object.keys(errors).length === 0)}
        className="btn btn-primary d-block w-75 mt-4 mb-2 m-auto"
      >
        Изменить
      </button>
      <button
        className="btn btn-secondary d-block w-75   m-auto"
        onClick={() => {
          history.goBack();
        }}
      >
        Назад
      </button>
    </div>
  );
};

export default EditUserPage;
