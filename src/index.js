import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorPage from "./component/errorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDetail from "./component/userDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user">
          <Route path=":userId" element={<UserDetail />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
