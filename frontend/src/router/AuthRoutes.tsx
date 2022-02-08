import { Route, Routes } from "react-router-dom";
import Login from "../containers/Login";
import ResetPassword from "../containers/ResetPassword";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset/:id/:token" element={<ResetPassword />} />
    </Routes>
  );
}
