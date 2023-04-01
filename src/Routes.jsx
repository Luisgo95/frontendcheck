import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import Login from "./components/login/Login";
import FormularioTabla from "./components/FormularioTabla/FormularioTabla";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/formulario-tabla"
          element={
            <PrivateRoute>
              <FormularioTabla />
            </PrivateRoute>
          }
        />
        {/* Aquí puedes agregar más rutas protegidas */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
