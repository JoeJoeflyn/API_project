import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SingleUser from "./component/singleUserAPI";
import ErrorPage from "./component/errorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user">
          <Route path=":userId" element={<SingleUser />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
