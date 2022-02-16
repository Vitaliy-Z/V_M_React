import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PATH_NAME } from "./utils/constant";
import NavBar from "./components/ui/NavBar";
import {
  MainPage,
  LoginPage,
  UserPage,
  UsersListPage,
  EditUserPage
} from "./pages";
import {
  UserProvider,
  ProfessionProvider,
  QualityProvider,
  AuthProvider
} from "./hooks";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Switch>
          <UserProvider>
            <Route path={PATH_NAME.main} exact component={MainPage} />
            <ProfessionProvider>
              <QualityProvider>
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
                <Route path={PATH_NAME.users} exact component={UsersListPage} />
              </QualityProvider>
            </ProfessionProvider>
          </UserProvider>
          <Redirect to={PATH_NAME.main} />
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
