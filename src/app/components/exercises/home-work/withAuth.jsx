import React, { useState } from "react";
import CardWrapper from "../../common/Card";

const withAuth = (Component) => (props) => {
    const [isAuth, setIsAuth] = useState(getIsAuth());
    function getIsAuth() {
        return Boolean(JSON.parse(localStorage.getItem("user")));
    }
    const onLogin = () => {
        localStorage.setItem(
            "user",
            JSON.stringify({ id: 1, name: "Vladilen" })
        );
        setIsAuth(getIsAuth);
    };
    const onLogOut = () => {
        localStorage.removeItem("user");
        setIsAuth(getIsAuth);
    };

    return (
        <CardWrapper>
            <Component
                isAuth={isAuth}
                handleClick={isAuth ? onLogOut : onLogin}
                {...props}
            />
        </CardWrapper>
    );
};

export default withAuth;
