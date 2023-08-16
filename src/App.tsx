import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, UserProfilePage } from "./pages";

import "./App.css";
import { LoginPage } from "./pages/login/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/myself" element={<UserProfilePage />} />
    </Routes>
  );
}

export default App;
