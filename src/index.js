import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "mobx-react";

import rootStore from "./Stores/RootStore";

const Root = (
  <Provider rootStore={rootStore}>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
