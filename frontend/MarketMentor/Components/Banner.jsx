import { Card, Typography, Flex, Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Grow from "@mui/material/Grow";

import { useNews } from "./NewsContext";
const Banner = ({ profile }) => {
  
  const {
    latest_news,

    onLoadArticles,
  } = useNews();
  useEffect(() => {
   latest_news()
  }, [])

  if (!onLoadArticles) {
    console.log("articles didn")
  }


  const [fullList, openFullList] = useState(false);
  return (
    <Card
      style={{
        minHeight: "500px",
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        background: "rgba(255, 255, 255, 0.95)",
      }}
    >
      <Flex vertical justify="space-between" style={{ height: "270px" }}>
        <div>
          <Typography.Title
            level={1}
            style={{
              margin: "0 0 16px 0",
              fontSize: "2.5rem",
              color: "#262626",
              fontWeight: "600",
            }}
          >
            Welcome {profile.username}!
          </Typography.Title>
          <Typography.Text
            style={{
              fontSize: "18px",
              color: "#666",
              fontWeight: "400",
            }}
          >
            Featured Articles:
          </Typography.Text>
        </div>

        <div
          style={{
            height: "400px",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid white",
            position: "relative",
            overflowx: "hidden",
            width: "100%",
          }}
        >
          {onLoadArticles.slice(0, 5).map((article, i) => (
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...(true ? { timeout: 1000 } : {})}
            >
              <Card style={{ height: "300px", width: "300px", margin: "10px" }}>
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

        <Button
          type="primary"
          size="large"
          style={{
            marginTop: "16px",
            height: "60px",
            alignSelf: "center",
            background: "navy",
            fontWeight: "500",
            borderRadius: "6px",
          }}
          onClick={() => openFullList(true)}
        >
          See more
        </Button>

        <Modal
          open={fullList}
          onCancel={() => openFullList(false)}
          width={1000}
          footer={null}
          title={"Full list of featured articles for today"}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
              maxHeight: "500px",
              overflowY: "auto",
              padding: "25px",
              margin: "12px",
            }}
          >
            {onLoadArticles.map((article, i) => (
              <Grow key={i} in={true}>
                <Card
                  hoverable
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    alt="no image found"
                    src={article.image}
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <h4 style={{ margin: 0 }}>{article.title}</h4>

                  <a
                    href={article.url}
                    target="_blank"
                    style={{ marginTop: "auto"}}
                  >
                    <Button type="primary" style={{ backgroundColor: 'navy'}}>
                      <strong>Read More</strong>
                    </Button>
                  </a>
                </Card>
              </Grow>
            ))}
          </div>
        </Modal>
      </Flex>
    </Card>
  );
};

export default Banner;
