import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Sesion } from "./Sesion";
import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoute";
import { DashboardRoutes } from "./routes/DashboardRoutes";
function Navegate() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Sesion />
            </PublicRoute>
          }
        />
        <Route
         path="/*"
         element={
         <PrivateRoute>
          <DashboardRoutes/>
         </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default Navegate;
