import React from "react";

import "./Login.css";
import { createNewUser } from "./helper";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [key, setKey] = React.useState("");
  const [secret, setSecret] = React.useState("");

  const loginUrl = `https://no23.lavina.tech/signup`;
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      key,
      secret,
    };

    if (
      name.length > 2 &&
      email.includes("@") &&
      key.length > 2 &&
      secret.length > 2
    ) {
      const resData = await createNewUser(loginUrl, newUser);
      if (resData.isOk) {
        localStorage.setItem("key", resData.data.key);
        localStorage.setItem("secret", resData.data.secret);
        navigate(`/home`);
      }
    } else {
      window.alert("Fill all inputs");
    }
  };

  return (
    <div className="form_wrapper">
      <form action="#" method="" className="box" onSubmit={createUser}>
        <h1>Create user</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name=""
          placeholder="name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name=""
          placeholder="email"
        />
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          name=""
          placeholder="key"
        />
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          name=""
          placeholder="secret"
        />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};
