import React, { useState } from "react";
// import PropTypes from "prop-types";
import { SelectField, TextAreaFeild } from "../common";
import { useUsers } from "../../hooks/useUsers";

const UserComentForm = () => {
  const [data, setData] = useState({});
  const { allUsers } = useUsers();

  const arrOfNameUsers =
    allUsers && allUsers.map(user => ({ label: user.name, value: user._id }));

  const handleChange = target => {
    if (typeof target.value === "string") {
      setData(prev => ({ ...prev, [target.name]: target.value }));
    } else {
      setData(prev => ({ ...prev, [target.name]: target.value.value }));
    }
  };

  const handleSubmit = () => {
    console.log(data);
    // Не могу сбросить Select
    setData(prev => ({ ...prev, content: "" }));
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h2>Новый комментарий</h2>
        <form action="">
          <div className="mb-4">
            <SelectField
              name={"userId"}
              onChange={handleChange}
              options={arrOfNameUsers || []}
            />
          </div>
          <TextAreaFeild
            label={"Комментарий"}
            name={"content"}
            value={data.content || ""}
            onChange={handleChange}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!data?.content || !data?.userId}
            className="btn btn-primary w-100"
          >
            Опубликовать
          </button>
        </form>
      </div>
    </div>
  );
};

UserComentForm.propTypes = {};

export default UserComentForm;
