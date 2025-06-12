import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ApplyPage from "./pages/ApplyPage";
import RecruiterPage from "./pages/RecruiterPage";
import Navigation from "./components/Navigation";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <Router>
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
            <Route path="/recruiter" element={<RecruiterPage />} />
            <Route path="/" element={<Navigate to="/apply" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
