import React from "react";
import ReactDOM from "react-dom/client";

import "@wizleap-inc/wiz-ui-react/dist/style.css";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
