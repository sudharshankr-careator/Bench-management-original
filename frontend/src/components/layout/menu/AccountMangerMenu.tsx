import { DashboardOutlined, TeamOutlined } from "@ant-design/icons";
import { Image, Menu } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";

export default function AccountMangerMenu(props: any) {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handle = (e: any) => {
    console.log("🚀 ~ file: AdminMenu.tsx ~ line 17 ~ handle ~ e", e);
  };
  return (
    <>
      <Image
        src={logo}
        height={60}
        preview={false}
        width={180}
        className={!props.collapsed ? "logoimg" : "vis"}
        onClick={() => nav("/")}
      />
      <Menu
        theme="light"
        defaultSelectedKeys={["sub1"]}
        mode="inline"
        onClick={handle}
      >
        <Menu.Item
          key="sub1"
          icon={<DashboardOutlined />}
          title="Dashboard"
          onClick={() => {
            nav("/");
          }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="sub2"
          icon={<TeamOutlined />}
          title="manageresource"
          onClick={() => {
            nav("/manageresource");
          }}
        >
          Manage Resource
        </Menu.Item>
      </Menu>
    </>
  );
}
