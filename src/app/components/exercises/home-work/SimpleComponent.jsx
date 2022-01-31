import React from "react";
import PropTypes from "prop-types";

const SimpleComponent = ({
    isAuth,
    handleClick = ({ target }) => console.log(target.innerText)
}) => {
    return (
        <div className="d-flex align-items-baseline">
            <p className="me-2 fs-4 fw-bold">
                Пользователь {isAuth ? "авторизован" : "НЕ авторизован"}
            </p>
            <button className="btn btn-primary" onClick={handleClick}>
                {isAuth ? "Выйти из системы" : "Войти"}
            </button>
        </div>
    );
};

SimpleComponent.propTypes = {
    handleClick: PropTypes.func,
    isAuth: PropTypes.bool
};

export default SimpleComponent;
