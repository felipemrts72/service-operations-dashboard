import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"
import { ServicesProvider } from "./context/ServicesContext";


ReactDOM.createRoot(
  document.getElementById("root")!
).render(   
  <ServicesProvider>
    <App />
  </ServicesProvider>
);
