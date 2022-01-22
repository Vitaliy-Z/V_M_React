import React, { useState, useEffect } from "react";
import validator from "../utils/validator";

// import { Loader } from "../components/Loaders";
// import PropTypes from 'prop-types'

function LoginPage() {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setErrors(validator(data));
  }, [data]);

  const handleChangeInput = ({ target }) => {
    setData(prev => ({ ...prev, [target.name]: target.value.trim() }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="container mt-5 p-5 w-50 shadow">
      <h1>Вход</h1>
      <form action="">
        <label className="form-label d-block">
          Электроння почта
          <input
            type="email"
            name="email"
            placeholder="emaile@maile.com"
            value={data.email}
            error={errors.email}
            onChange={handleChangeInput}
            className={
              "form-control is-" + (errors.email ? "invalid" : "valid")
            }
          />
          {errors.email && <p className="invalid-feedback">{errors.email}</p>}
        </label>

        <label className="form-label d-block">
          Пароль
          <div className="input-group has-validation">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Введите пароль"
              value={data.password}
              error={errors.password}
              onChange={handleChangeInput}
              className={
                "form-control is-" + (errors.password ? "invalid" : "valid")
              }
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
            >
              <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
            </button>
            {errors.password && (
              <p className="invalid-feedback">{errors.password}</p>
            )}
          </div>
        </label>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!(Object.keys(errors).length === 0)}
          className="btn btn-primary d-block w-75 m-auto"
        >
          Отправить
        </button>
      </form>
      {/* <Loader /> */}
    </div>
  );
}

LoginPage.propTypes = {};

export default LoginPage;
