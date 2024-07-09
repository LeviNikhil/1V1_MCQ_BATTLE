import React from "react";
import { Route, Routes } from "react-router-dom";
import { Urls } from "../constant/Urls";
import HomePage from "../pages/home.page.js";
import LoginPage from "../pages/login.page.js";
import EditMcqPage from "../pages/mcq/EditMcqPage.js";
import McqPage from "../pages/mcq/McqPage.js";
import McqsPage from "../pages/mcq/McqsPage.js";
import NewMcqPage from "../pages/mcq/NewMcqPage.js";
import SignupPage from "../pages/signup.page.js";
import ProtectedRoute from "./ProtectedRoute.js";


const AppRouter = () => {
  return (
    <Routes>
      <Route path={Urls.Home()} element={<HomePage />} />
      <Route path={Urls.Signup()} element={<SignupPage />} />
      <Route path={Urls.Login()} element={<LoginPage />} />

      <Route
        path={Urls.Mcqs.Mcqs()}
        element={
          <ProtectedRoute>
            <McqsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={Urls.Mcqs.Mcq(":id")}
        element={
          <ProtectedRoute>
            <McqPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={Urls.Mcqs.NewMcq()}
        element={
          <ProtectedRoute>
            <NewMcqPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={Urls.Mcqs.EditMcq(":id")}
        element={
          <ProtectedRoute>
            <EditMcqPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;