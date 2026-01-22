import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

import { CssBaseline } from "@mui/material";
import { ToastProvider } from "./context/ToastContext";
import { CustomThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CustomThemeProvider>
          <CssBaseline />
          <ToastProvider>
            <App />
          </ToastProvider>
        </CustomThemeProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
