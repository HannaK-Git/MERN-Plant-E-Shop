import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";


const root = ReactDOM.createRoot(document.getElementById("root"));

export const Context = createContext(null);

const userStore = new UserStore();
const deviceStore = new DeviceStore();


root.render(
  <Context.Provider
    value={{
      user: userStore,
      device: deviceStore,
     
    }}
  >
    <App />
  </Context.Provider>
);

reportWebVitals();
