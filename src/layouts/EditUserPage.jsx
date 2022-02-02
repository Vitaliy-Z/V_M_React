import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import API from "../api";
import MultiSelectField from "../components/common/MultiSelectField";
import RadioField from "../components/common/RadioField";
import SelectField from "../components/common/SelectField";
import TextFeild from "../components/common/TextFeild";
import { Loader } from "../components/Loaders";
import { transformDataToFeild } from "../utils/helperFunctions";
import validator from "../utils/validator";
import { AllUserContext } from "../context";

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState();
  const [allProfessions, setAllProfessions] = useState([]);
  const [allQualitties, setAllQualitties] = useState([]);
  const [errors, setErrors] = useState();
  const { allUsers, setAllUsers } = useContext(AllUserContext);

  useEffect(() => {
    setUser(allUsers.find(u => u._id === userId));
    API.professions.fetchAll().then(data => {
      setAllProfessions(transformDataToFeild(data));
    });
    API.qualities
      .fetchAll()
      .then(data => setAllQualitties(transformDataToFeild(data)));
  }, []);
  useEffect(() => {
    setErrors(validator(user));
  }, [user]);

  const handleChange = target => {
    if (target.name === "profession") {
      setUser(prev => ({
        ...prev,
        [target.name]: { _id: target.value.value, name: target.value.label }
      }));
      return;
    }
    if (target.name === "qualities") {
      const newQualities = target.value.map(item => ({
        _id: item._id,
        name: item.name,
        color: item.color
      }));
      setUser(prev => ({
        ...prev,
        [target.name]: newQualities
      }));
      return;
    }
    setUser(prev => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    API.users.update(userId, user);
    setAllUsers(prev =>
      prev.map(u => {
        if (u._id === user._id) {
          return user;
        }
        return u;
      })
    );
    history.goBack();
  };

  if (!user) {
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
          value: user.profession._id,
          label: user.profession.name
        }}
        options={allProfessions}
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
        defaultValue={user.qualities.map(item => ({
          ...item,
          value: item._id,
          label: item.name
        }))}
        options={allQualitties}
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

// EditUserPage.propTypes = {};

export default EditUserPage;
