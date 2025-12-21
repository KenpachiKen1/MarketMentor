import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  InfoOutlined,
  DollarOutlined
} from "@ant-design/icons";

import { useNavigate, useLocation } from "react-router-dom";
import { Flex, Menu} from "antd";
import React from "react";
import "../Components/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const pathTokKeys = {
    "/Dashboard": "1",
    "/Modules": "2",
    "/About": "3"
  }

  const handleLogOut = () => {
    sessionStorage.removeItem("access");
    navigate("/"); //return them to the log in
  };
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <DollarOutlined style={{ fontSize: "50px", color: "black" }} />
        </div>
      </Flex>

      <Menu
        mode="inline"
        selectedKeys={[pathTokKeys[location.pathname] || "1"]}
        className="menu-bar"
        items={[
          {
            key: "1",
            icon: <ProfileOutlined />,
            label: "Home",
            onClick: () => navigate("/Dashboard"),
          },
          {
            key: "2",
            icon: <UserOutlined />,
            label: "Modules",
            onClick: () => navigate("/Modules"),
          },
          {
            key: "3",
            icon: <InfoOutlined />,
            label: "About",
            onClick: () => navigate("/About"),
          },

          {
            key: "4",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: handleLogOut,
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
