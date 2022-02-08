import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import LayOut from "./components/layout/Layout";
import AuthRoutes from "./router/AuthRoutes";
import { Store } from "./types/Redux";

function App() {
  const token = useSelector((store: Store) => store.userSession.user?.token);

  return token ? <LayOut /> : <AuthRoutes />;
}

export default App;
