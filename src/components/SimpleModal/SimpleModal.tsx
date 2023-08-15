import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
}

export const SimpleModal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
        <br />
        {children}
      </Box>
    </Modal>
  );
};
