import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { AllUserContext } from "../../context";
import SelectField from "../common/SelectField";
import TextAreaFeild from "../common/TextAreaFeild";
import API from "../../api";

const UserComentForm = ({ userId, setComments }) => {
  const { allUsers } = useContext(AllUserContext);
  const [data, setData] = useState({});

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
    API.comments
      .add({ ...data, pageId: userId })
      .then(data => setComments(prev => [...prev, data]));

    // Не могу сбросить селект
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

UserComentForm.propTypes = {
  userId: PropTypes.string,
  setComments: PropTypes.func
};

export default UserComentForm;
