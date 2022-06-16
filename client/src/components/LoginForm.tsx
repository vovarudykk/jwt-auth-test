import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import React, { FC, useState, useContext } from "react";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { store } = useContext(Context);

  return (
    <div>
      <input
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button onClick={() => store.login(email, password)}>Login</button>
      <button onClick={() => store.registration(email, password)}>
        Registration
      </button>
    </div>
  );
};

export default observer(LoginForm);
