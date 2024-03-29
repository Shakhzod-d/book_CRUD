import React from "react";
import { CircularProgress, Box } from "@mui/material";

export const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
};
