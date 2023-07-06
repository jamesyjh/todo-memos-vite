import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { persistor, store } from "./redux/store";
import { App } from "./App";
import { PersistGate } from "redux-persist/integration/react";

import "./app.css";
import "./tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
