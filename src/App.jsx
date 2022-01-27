import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AllUserContext } from "./context";
import API from "./api";
import { PATH_NAME } from "./utils/constant";
import NavBar from "./components/NavBar";
import MainPage from "./layouts/MainPage";
import LoginPage from "./layouts/LoginPage";
import UserPage from "./layouts/UserPage";
import UsersListPage from "./layouts/UsersListPage";
import EditUserPage from "./layouts/EditUserPage";

function App() {
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    API.users.fetchAll().then(data => setAllUsers(data));
  }, []);

  return (
    <BrowserRouter>
      <AllUserContext.Provider value={{ allUsers, setAllUsers }}>
        <NavBar />
        <Switch>
          <Route path={PATH_NAME.main} exact component={MainPage} />
          <Route
            path={`${PATH_NAME.login}/:type?`}
            exact
            component={LoginPage}
          />
          <Route
            path={`${PATH_NAME.users}/:userId`}
            exact
            component={UserPage}
          />
          <Route
            path={`${PATH_NAME.users}/:userId/edit`}
            component={EditUserPage}
          />
          <Route path={PATH_NAME.users} component={UsersListPage} />
          <Redirect to={PATH_NAME.main} />
        </Switch>
      </AllUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
