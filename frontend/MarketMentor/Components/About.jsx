import React, {useState} from "react"

import Card from "@mui/material/Card"
import { Button, Flex, Progress, Space, Layout, Input } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import Sidebar from "./sidebar";

const About = () => {
    
  const [collapsed, setCollapsed] = useState(false);

    return (
      <Layout>
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="sider"
        >
          <Sidebar />
        </Sider>
        <Layout>
          <Content
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px",
            }}
          >
            <Card style={{ width: "50%", height: "50%" }}>
              <h2 style={{ margin: "10px" }}>
                About this app and me (Kenneth, the creator)
              </h2>

              <br />

              <p style={{ margin: "10px" }}>
                <strong>
                  I have experience making full stack applications prior to
                  taking INST377. Admittedly, like 95% of the material taught in
                  this class, I already knew about + had some experience in but
                  it was still very enjoyable. The newest thing I learned was
                  express.js, however I have a lot experience building backends
                  already, the concepts are still the same. My career goal is to
                  become a fullstack or software engineer at a good comapny. I
                  have 2 software engineering internships already, and i actally
                  received an offer for another one for next summer which I am
                  excited for but I am still looking for the best posisble
                  opportunities.
                </strong>{" "}
              </p>

              <br />

              <p style={{ margin: "10px" }}>
                <strong>
                  To build this app I used a tech stack I was already familiar
                  with, I used react + vite, and I used material UI and ant
                  design for some premade components. I decided to make a stock
                  tutor and news app becase I invest in the market myself and I
                                remember how difficult it was to get started, so I figured this minimal could be a good way for new users to learn about the market without having to spend real money.
                                
                                <br />
                                
                The news aspect is to replicate yahoo finance. There is a news section, either for a stock or for any topic in general, but you'll see in my backend I tailored it to focus mainly on tech and finance 
                        
                                <br />
                                I will also use this time to plug my upcoming App GameHaven. Its another solo project I am making using django, react, langgraph and a few gaming/tournament API's to help make a central hub for gamers.
                 
                                
                </strong>{" "}
              </p>
            </Card>
          </Content>
        </Layout>
      </Layout>
    );

}


export default About