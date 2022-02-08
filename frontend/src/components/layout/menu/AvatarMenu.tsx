import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserActions from "../../../redux/actions/UserActions";
export default function AvatarMenu() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    await localStorage.clear();
    await dispatch(UserActions.logout());
    await nav("/");
  };
  return (
    <Menu>
      <Menu.Item key={1} onClick={() => nav("/profile")}>
        <p>
          {" "}
          <UserOutlined /> Profile
        </p>
      </Menu.Item>
      <Menu.Item onClick={logout} key={2}>
        <p style={{ color: "red" }}>
          <LogoutOutlined /> Logout
        </p>
      </Menu.Item>
    </Menu>
  );
}
