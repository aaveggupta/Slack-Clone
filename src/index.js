import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import { reducer, initialState } from "./Helpers/reducer";
import { StateProvider } from "./Helpers/StateProvider";

ReactDOM.render(
  <StateProvider reducer={reducer} initialState={initialState}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StateProvider>,
  document.getElementById("root")
);
