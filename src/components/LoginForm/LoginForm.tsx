import React, { useState } from "react";
import { Button, TextField, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

interface LoginFormProps {
  onLogin: (name: string, email: string, key: string, secret: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [key, setKey] = React.useState("");
  const [secret, setSecret] = React.useState("");
  
  const handleLogin = () => {
    onLogin(name, email, key, secret);
  };

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>
        Create a new user
      </Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Key"
        fullWidth
        margin="normal"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <TextField
        label="Secret"
        type="password"
        fullWidth
        margin="normal"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>
    </Paper>
  );
};
