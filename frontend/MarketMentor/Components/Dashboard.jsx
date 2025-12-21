
import React, { useState, useEffect, useRef } from "react";
import { Layout, Menu, Flex, Button, Tour } from "antd";
import { Input, Space } from "antd";

const { Header, Content, Footer, Sider} = Layout;
import { useNews } from "./NewsContext";

const { Search } = Input;

import "../Components/Dashboard.css";

import MainContent from "./MainContent";
import Sidebar from "./sidebar";

import Banner from "./Banner";
import CustomHeader from "./CustomHeader";

import { useAccount } from "./ProfileContext";
import { useNavigate } from "react-router-dom";
const Dashboard = ({toggle}) => {

   const { profile, getProfile } = useAccount();
  const navigate = useNavigate();
  

   const ref1 = useRef(null);
   const ref2 = useRef(null);
   const ref3 = useRef(null);

  const [open, setOpen] = useState(false);

  
  const [collapsed, setCollapsed] = useState(false);
  

  const startTour = () => {
    setTimeout(() => setOpen(true), 100);
  }
const steps = [
  {
    title: "Sidebar",
    description: "Navigate this app using the sidebar",
    target: () => ref1.current,
  },
  {
    title: "Search",
    description: "Search for news articles relating to stocks or other tech with this search bar.",
    target: () => ref2.current,
  },

];

  
   const {
    search,
    setSearch,
   } = useNews();
  
    const handle_search = (search) => {
  
        navigate(`/News?search=${encodeURIComponent(search)}`);
    };

    return (
      <Layout
        style={{
          minHeight: "75vh",
          minWidth: "75vw",
          background: "transparent",
        }}
      >
        <div ref={ref1}>
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="sider"
          >
            <Sidebar key={profile?.id || "sidebar"} />
          </Sider>
        </div>
        <Layout>
          <Header
            className="header"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Flex align="center" gap="3rem">
              <Button
                type="primary"
                onClick={startTour}
                style={{ backgroundColor: "red", fontWeight: "bold" }}
              >
                Show tutorial
              </Button>
              <div ref={ref2}>
                <Search
                  placeholder="News Search"
                  allowClear
                  onChange={(e) => setSearch(e.target.value)}
                  onSearch={() => handle_search(search)}
                />
              </div>
            </Flex>
          </Header>

          <Content
            className="content"
            style={{
              margin: "10px",
              marginTop: "50px",
              background: "transparent",
            }}
          >
            <MainContent toggle={toggle} />
          </Content>
        </Layout>
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      </Layout>
    );

}

export default Dashboard
