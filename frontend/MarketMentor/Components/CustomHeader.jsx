import { Avatar, Typography, Flex } from "antd";
import React, { useEffect } from "react";
import Search from "antd/es/input/Search";
import {
  MessageOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAccount } from "./ProfileContext";

const CustomHeader = ({ profile }) => {

  return (
    <>
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Typography.Title level={3} type="secondary" style={{ color: "white" }}>
          Welcome {profile.username}
        </Typography.Title>

        <Flex align="center" gap="3rem">
          <Search placeholder="Search for games/user" allowClear />
          <Flex align="center" gap="10px">
            
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CustomHeader;
