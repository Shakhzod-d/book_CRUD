import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Container } from "@mui/material";

import { LoginForm } from "../../components";
import { ApiResponse } from "./types";
import { signupUser } from "../../features/user/userSlice";

export const LoginPage: React.FC = () => {
  const user = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (
    name: string,
    email: string,
    key: string,
    secret: string
  ) => {
    const newUser: ApiResponse = {
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
      dispatch(signupUser(newUser) as any);
    } else {
      window.alert("Fill all inputs");
    }
  };

  useEffect(() => {
    if (user.auth) {
      navigate("/");
    }
  }, [user.auth]);

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <LoginForm onLogin={handleLogin} />
        </Grid>
      </Grid>
    </Container>
  );
};
