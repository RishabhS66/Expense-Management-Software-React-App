import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

import App from "./App";
import MainHeader from "./components/MainHeader/MainHeader";

import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainHeader />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
