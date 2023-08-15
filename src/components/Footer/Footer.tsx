import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    right: 0,
    backgroundColor: "#1976d2",
    color: "#fff",
    padding: "2rem",
    textAlign: "center",
    marginTop: "2rem",
    fontSize: "16px",
  },
}));

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Book shelf SPA made by Shakhzod Jumaev. All
        rights reserved.
      </Typography>
    </footer>
  );
};
