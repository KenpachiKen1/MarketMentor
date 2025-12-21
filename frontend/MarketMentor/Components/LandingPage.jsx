import React, { useState, useEffect } from "react";

import { useAuth } from "./AuthContext";
import { motion } from "framer-motion";

import { Tabs } from "antd";
import { Button, Form, Input, Typography, Carousel } from "antd";

import Title from "antd/es/typography/Title";
import image from "../src/assets/image.png";
import image2 from "../src/assets/image2.png"
const { Text } = Typography;

const LandingPage = () => {

    const { login, signup, loading, error } = useAuth();

    const [tabKey, setTabKey] = useState("1");
    
    const frames = [image, image2]
    const [frame, setFrame] = useState(0);

    const carouselRef = useState(null)

    useEffect(() => {
      const interval = setInterval(() => {
        setFrame((prev) => (prev + 1) % frames.length);
      }, 500); // change every 150ms
      return () => clearInterval(interval);
    }, []);

     const goToNext = () => {
       if (carouselRef.current) {
         carouselRef.current.next();
       }
     };
    const login_account = () => {
        return (
          <Form
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: "25%" }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            onFinish={login}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "A username is required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "A password is required" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit">Login!</Button>
            </Form.Item>
          </Form>
        );
    }


    const signup_account = () => {
    return (
      <Form
        name="signup"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: "25%" }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinish={signup}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "A username is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "A password is required" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Create Account</Button>
        </Form.Item>
      </Form>
    );
    };

    
    



    return (
      <>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
          transition={{ duration: 3 }}
          style={{ textAlign: "center", marginTop: 40, color: "grey" }}
        >
          Welcome to Market Mentor!
        </motion.h1>
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          <img
            src={frames[frame]}
            alt="Pixel Animation"
            style={{
              imageRendering: "pixelated",
              width: "100%",
              height: "175px",
            }}
          ></img>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            maxWidth: 1200,
            margin: "40px auto",
            padding: "0 20px",
            gap: 60, // More space between left and right divs
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40, // gap between carousel and social media
              flex: "1 1 65%",
              maxWidth: 750,
            }}
          >
            {/* Carousel container */}
            <div
              style={{
                backgroundColor: "white",
                padding: 24,
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                width: "100%",
              }}
            >
              <Title level={3} style={{ textAlign: "center" }}>
                Learn About Stocks and catch up on the latest news!
              </Title>
            
                        {/*ADD CAROUSEL HERE */ }
              <Text
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: 16,
                  fontWeight: "bold",
                  fontSize: "25px",
                }}
              >
                {" "}
                Shoutout to CurrentsAPI and Alpha Vantage API for making this
                possible
              </Text>
            </div>

            {/* Social Media Div */}
            <div
              style={{
                backgroundColor: "white",
                padding: 24,
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                minHeight: 120,
                width: "100%",
              }}
            >
              <Title level={3} style={{ textAlign: "center" }}>
                Follow me on social media
              </Title>
              <Text
                style={{ display: "block", textAlign: "center", marginTop: 16 }}
              >
                Stay updated with the latest news and features.
              </Text>
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Button
                  type="primary"
                  href="https://www.linkedin.com/in/kentimi"
                  target="_blank"
                >
                  My LinkedIn!
                </Button>
                <Button
                  type="primary"
                  href="https://instagram.com/13kken"
                  target="_blank"
                  style={{ marginLeft: 8 }}
                >
                  My Instagram!
                </Button>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
              padding: 32,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              maxWidth: 400,
              flex: "0 0 400px",
              alignSelf: "flex-start",
            }}
          >
            <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
              Get Connected Today!
            </Title>
            <Tabs
              activeKey={tabKey}
              onChange={setTabKey}
              centered
              items={[
                { label: "Login", key: "1", children: login_account() },
                { label: "Sign Up", key: "2", children: signup_account() },
              ]}
            />
          </div>
        </div>
      </>
    );
}

export default LandingPage