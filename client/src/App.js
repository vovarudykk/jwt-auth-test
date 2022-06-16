import "./App.css";
import LoginForm from "./components/LoginForm.tsx";
import { Context } from "./index.js";
import { observer } from "mobx-react-lite";
import UserService from "./services/UserService.ts";

import React, { FC, useContext, useEffect, useState } from "react";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <div>Загрузка</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? `User auth ${store.user.email}` : `Not auth`}</h1>
      <h1>
        {store.user.isActivated
          ? `User activated ${store.user.email}`
          : `Not activated`}
      </h1>
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={() => getUsers()}>Get all users</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};

export default observer(App);
