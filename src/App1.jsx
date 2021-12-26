import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import _ from "lodash";
import API from "./api";
import { INITION_SORT_BY } from "./utils/constant";
import NavBar from "./components/NavBar";
import MainPage from "./layouts/MainPage";
import LoginPage from "./layouts/LoginPage";
import UserPage from "./layouts/UserPage";
import UsersListPage from "./layouts/UsersListPage";

function App1() {
  const [allUsers, setAllUsers] = useState();
  const [usersOfShowed, setUsersOfShowed] = useState();
  const [allProfessions, setAllProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    API.professions.fetchAll().then(res => setAllProfessions(res));
    API.users.fetchAll().then(res => {
      setAllUsers(res);
      setUsersOfShowed(res);
      setUsersOfShowed(
        _.orderBy(res, [INITION_SORT_BY.itr], [INITION_SORT_BY.order])
      );
    });
  }, []);

  const handleDeleteUserBtn = event => {
    const updatedUsers = usersOfShowed.filter(
      user => user._id !== event.target.id
    );
    setUsersOfShowed(updatedUsers);
  };

  const handleCheckBookmark = id => {
    const updatedUsers = usersOfShowed.map(user => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsersOfShowed(updatedUsers);
  };

  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <MainPage usersOfShowed={usersOfShowed} {...props} />
          )}
        />
        <Route path="/login" component={LoginPage} />
        <Route
          path="/users/:userId"
          render={() => (
            <UserPage
              allUsers={allUsers}
              onCheckBookmark={handleCheckBookmark}
              onDeleteUserBtn={handleDeleteUserBtn}
            />
          )}
        />
        <Route
          path="/users"
          render={props => (
            <UsersListPage
              allUsers={allUsers}
              usersOfShowed={usersOfShowed}
              setUsersOfShowed={setUsersOfShowed}
              selectedProf={selectedProf}
              setSelectedProf={setSelectedProf}
              allProfessions={allProfessions}
              onCheckBookmark={handleCheckBookmark}
              onDeleteUserBtn={handleDeleteUserBtn}
              {...props}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App1;
