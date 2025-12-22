import React, { useState, useEffect, useRef } from "react";

import { Carousel, Tabs, Button, Modal, Card, Tour, Layout, Steps } from "antd";

import Quiz2 from "./Quiz2";
import Quiz3 from "./Quiz3";
import Quiz1 from "./Quiz1";


import { useAccount } from "./ProfileContext";
const { Header, Content, Footer, Sider } = Layout;


import"../Components/Modules.css"

import Sidebar from "./sidebar";
const Modules = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState(0);

  const [open, setOpen] = useState(false)

  const { profile, getProfile } = useAccount();

   useEffect(() => {
     getProfile();
   }, []);

  const ref1 = useRef(null);

  if (!profile) return <p>Loading...</p>;
  
const startTour = () => {
    setTimeout(() => setOpen(true), 100);
}

const [hovered, setHovered] = useState(false);


const steps = [
  {
    title: "Modules",
    description: "You have 3 learning modules, complete all 3 for reward!",
    target: () => ref1.current,
  }
]
  const tickerVid = (
    <a
      href="https://youtu.be/agAHRwOqQd4?si=zDjOBsrnNpjLr4P-"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className="button-49"> Click to watch on youtube!</Button>
    </a>
  );
    
    
     const marketVid = (
       <a
         href="https://youtu.be/T37YvxMTofc?si=GVxLoDLp7SanOAik "
         target="_blank"
         rel="noopener noreferrer"
       >
         <Button className="button-49"> Click to watch on youtube!</Button>
       </a>
     );

  const TickerReading = (
    <a
      href="https://www.investopedia.com/terms/s/stocksymbol.asp "
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className="button-49">
        {" "}
        Click to read this article on Ticker symbols
      </Button>
    </a>
  );
    
    
  const tradingVid = (
    <a
      href="https://youtu.be/embed/QuTXaErpKxY?si=4DGCA9ARJSIhuQsp "
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className="button-49"> Click to watch on youtube!</Button>
    </a>
  );
    
  const TradingReading = (
    <a
      href="https://www.investopedia.com/terms/t/trading-platform.asp
        "
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
className="button-49" 
      

      >
        {" "}
        Click to read this article!
      </Button>
    </a>
  );
    
  const MarketReading = (
    <a
      href="https://www.nerdwallet.com/investing/learn/bullish-vs-bearish"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className="button-49"> Click to read this article!</Button>
    </a>
  );

  const MarketItems = [
    {
      title: "Video on Stock Market Concepts",
      content: marketVid,
    },
    {
      title: "Article about Market Terms",
      content: MarketReading,
    },
    {
      title: "Quiz 2",
      content: <Quiz2 profile={profile}/>,
    },
  ];

  const TickerItems = [
    {
      title: "Video on Ticker Symbols",
      content: tickerVid,
    },
    {
      title: "Article about Ticker Symbols",
      content: TickerReading,
    },
    {
      title: "Quiz 1",
      content: <Quiz1 profile={profile} />,
    },
  ];

    const TradingItems = [
      {
        title: "Video on Trading Platforms",
        content: tradingVid,
      },
      {
        title: "Article about Ticker Symbols",
        content: TradingReading,
      },
      {
        title: "Quiz 3",
        content: <Quiz3 profile={profile}/>,
      },
    ];



    

    const ModuleCards = ({ title, item }) => {
        const [current, setCurrent] = useState(0);

        return (
          <Card>
                <h2>{title}</h2>
                
                <h5>Note to future self: Never use iframes again. :/ </h5>
            <Steps
              items={item.map((i) => ({ titles: i.title }))}
              current={current}
              onChange={setCurrent}
            />
            <Card style={{ margin: "15px" }}>{item[current].content}</Card>

            <Button
              disabled={current == 0}
              onClick={() => setCurrent(current - 1)}
              style={{ margin: "5px" }}
            >
              Back
            </Button>
            <Button
              type="primary"
              disabled={current == TickerItems.length - 1}
              onClick={() => setCurrent(current + 1)}
            >
              Forward
            </Button>
          </Card>
        );
    }
    
  return (
    <>
      <Layout style={{ minHeight: "75vh", minWidth: "75vw" }}>
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
          <Header
            className="header"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              type="primary"
              onClick={startTour}
              style={{ backgroundColor: "red", fontWeight: "bold", margin: '10px'}}
            >
              Show tutorial
            </Button>
            <h1 style={{ color: "white" }}>Learning Modules</h1>
          </Header>

          <Content>
            <Card
              style={{
                margin: "80px",
                minHeight: "75vh",
                minWidth: "75vw",
                marginTop: "100px",
              }}
              ref={ref1}
            >
              <h3>
                Know about stocks already? Feel free to skip to quizzes now!
              </h3>
              {profile.progress == 0 && (
                <ModuleCards
                  title="Module 1: Ticker Symbols"
                  item={TickerItems}
                />
              )}
              {profile.progress == 1 && (
                <ModuleCards
                  title="Module 2: Market Concepts"
                  item={MarketItems}
                />
              )}{" "}
              {profile.progress == 2 && (
                <ModuleCards
                  title="Module 3: Trading Platforms"
                  item={TradingItems}
                />
              )}
              {profile.progress == 3 && (
                <Card>
                  <h1>You completed all of your modules, good job!</h1>

                  <br />

                  <h2>Check your homepage for something cool!</h2>
                </Card>
              )}
            </Card>
          </Content>
        </Layout>
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      </Layout>
    </>
  );
};

export default Modules;
