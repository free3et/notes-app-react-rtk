import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "../node_modules/react-redux/es/exports";
import App from "./App";
import store from "./app/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
