import React, { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";


import { useNavigate } from "react-router-dom";
import { useNews } from "./NewsContext";

import { Button, Flex, Progress, Space, Layout, Card, Input } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

import LoadingBar from "./ProgressBar";

 import Grow from "@mui/material/Grow";

import Sidebar from "./sidebar";
const { Search } = Input;

const SearchResults = () => {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("search");

    const navigate = useNavigate();

    const {
    latest_news,
    loading,
    error,
    articles,
    search,
    setSearch,
     onLoadArticles,
    news_search,
    progress
    } = useNews();
  const [collapsed, setCollapsed] = useState(false);



 const handle_search = (search) => {
   navigate(`/News?search=${encodeURIComponent(search)}`);
 };
    
    
    useEffect(() => {
        if (query) {
            news_search(query)
        }
    }, [query]);

    

    if (loading) return (
            <LoadingBar progress={progress} loading={loading} />
    )


    return (
      <>
        <Layout style={{ minHeight: "75vh", minWidth: "75vw" }}>
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={collapsed}
                    className="sider" >
            <Sidebar />
          </Sider>
          <Layout>
            <Header
              className="header"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
            <h3 style={{margin: '10px', color: 'white'}}>Showing results for {query}</h3>        
              <Flex align="center" gap="3rem">
                <Search
                  placeholder="News Search"
                  allowClear
                  onChange={(e) => setSearch(e.target.value)}
                  onSearch={() => handle_search(search)}
                />
              </Flex>
            </Header>

            <Content
              className="content"
              style={{ margin: "10px", marginTop: "50px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                                justifyContent: "flex-start",
                                background: "transparent",
                  borderRadius: '8px'
                }}
              >
                {articles.slice(0, 15).map((article, i) => (
                  <Grow
                    in={true}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(true ? { timeout: 1000 } : {})}
                    key={i}
                  >
                    <Card
                      style={{
                        height: "300px",
                        width: "300px",
                        margin: "10px",
                      }}
                    >
                      <img
                        alt={"no image found"}
                        src={article.image}
                        height={100}
                        width={150}
                        style={{ borderRadius: "8px" }}
                      ></img>
                      <h5>{article.title}</h5>
                      <a href={article.url}>
                        <Button>Read More</Button>
                      </a>
                    </Card>
                  </Grow>
                ))}
              </div>
            </Content>
          </Layout>
        </Layout>
      </>
    );


}


export default SearchResults
