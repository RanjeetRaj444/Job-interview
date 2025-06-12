import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ApplyPage from "./pages/ApplyPage";
import RecruiterPage from "./pages/RecruiterPage";
import Navigation from "./components/Navigation";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route
            path="/apply"
            element={
              <PrivateRoutes>
                <ApplyPage />
              </PrivateRoutes>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/recruiter"
            element={
              <PrivateRoutes>
                <RecruiterPage />
              </PrivateRoutes>
            }
          />
          <Route
            path="/"
            element={
              // <PrivateRoutes>
              <Navigate to="/apply" replace />
              // </PrivateRoutes>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
