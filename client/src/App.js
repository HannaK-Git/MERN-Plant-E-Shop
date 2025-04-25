import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { check } from "./http/userAPI";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Context } from "./index";
import { Spinner } from "react-bootstrap";
import basket from "./store/BasketStore";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then(({ user: userData, basket: basketItems }) => {
        user.setUser(userData);
        user.setIsAuth(true);
        basket.setItems(basketItems); 
      })
      .finally(() => setLoading(false));
  }, []);


  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <AppRouter />
      </PayPalScriptProvider>
    </BrowserRouter>
  );
});

export default App;
