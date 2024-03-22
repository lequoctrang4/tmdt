import React from "react";
import ReactDOM from "react-dom/client";
import './assets/scss/style.scss';

import { Provider } from "react-redux";
import { store } from "./redux/ConfigStore";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <App/>
    </Provider>
  </>
);
