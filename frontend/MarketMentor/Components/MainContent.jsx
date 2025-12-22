import React, { useState, useEffect } from "react";

import { Flex, Card, Typography, Modal, Input , Tabs, Button} from "antd";

import { ScatterChart } from "@mui/x-charts";


import { DeleteOutlined } from "@ant-design/icons";
import Banner from "./Banner";

import "./MainContent.css"
const { Search } = Input
import { useAccount } from "./ProfileContext";
import { setTheme } from "./surprise";

const MainContent = ({toggle}) => {
  const {
    profile,
    getProfile,
    error,
    stock_search,
    daily,
    dailyDP,
    portfolio,
    add_to_port,
    results, setSearch, search, setDailyDP
    
  } = useAccount();

  useEffect(() => {
    getProfile()
  }, [])


const [selectedStock, setSelectedStock] = useState(null);

  const [selectedCompany, setSelectedCompany] = useState(null);

  const [stockModal, setStockModal] = useState(false)

  const [searchModal, setSearchModal] = useState(false);

  const [allStocksModal, setAllStocksModal] = useState(false);

  const [stockDetails, openStockDetails] = useState(false);



  
  const handle_details = (stock, company) => {
    setSelectedCompany(company)
    setSelectedStock(stock)
    openStockDetails(true)
}
 
  const handle_add_to_port = async (ticker, company) => {
     await add_to_port(ticker, company);
     setStockModal(false);
    setSearchModal(true);
  }


 
    const handle_stock_search = () => {
      stock_search(search); //poplulates results
      setSearchModal(true);
    };



function parseDailyScatterData(data) {
  const series = data["Time Series (Daily)"];

  if (series == null) return [];

  return Object.entries(series)
    .map(([date, values]) => ({
      x: Number(values["2. high"]),
      y: Number(values["4. close"]),
    }))
    .filter((point) => !Number.isNaN(point.x) && !Number.isNaN(point.y)); //removing points that aren't a number
}


  if (!profile) {
    return <h2>Session Expired Please re-login</h2> //json web token expired.
  }

  
  const dailyScatter = dailyDP ? parseDailyScatterData(dailyDP) : []; //if there isn't a chart, then load it in, a per stock ternary op

  return (
    <div style={{ minWidth: "60vw", minHeight: "75vh" }}>
      <Flex vertical gap="24px">
        {/* Top Banner spanning the full width */}
        <Banner profile={profile} />

        {/* Row of three evenly spaced cards below the banner */}
        <Flex gap="24px" justify="space-between" style={{ marginTop: "50px" }}>
          <Card title="Your portfolio" style={{ flex: 1, maxHeight: '575px'}}>
            <Typography.Title level={4}>Stocks</Typography.Title>
            <div>
              <Search
                placeholder="Add a stock"
                style={{ width: "300px" }}
                onChange={(e) => setSearch(e.target.value)}
                onSearch={() => handle_stock_search(search)}
              />

              <Button
                style={{
                  margin: "5px",
                  backgroundColor: "green",
                  color: "white",
                  fontWeight: "bold",
                }}
                onClick={() => setAllStocksModal(true)}
              >
                See All
              </Button>
            </div>

            <br />
            <div style={{ display: "flex"}}>
              {profile.list.slice(0, 3).map((stocks, i) => (
                <>
                  <Card
                    key={i}
                    className="Card"
                    onClick={() => {
                      handle_details(stocks.ticker, stocks.name);
                    }}
                  >
                    <h5>
                      {stocks.name}
                      <br /> {stocks.ticker}
                    </h5>
                  </Card>
                </>
              ))}
            </div>

            <Modal
              open={allStocksModal}
              onCancel={() => setAllStocksModal(false)}
              title={"All stocks for " + profile.username}
              onOk={() => setAllStocksModal(false)}
            >
              <div style={{ display: "flex" }}>
                {profile.list.map((stocks, i) => (
                  <>
                    <Card
                      key={i}
                      className="Card"
                      onClick={() => {
                        handle_details(stocks.ticker, stocks.name);
                      }}
                    >
                      <h5>
                        {stocks.name}
                        <br /> {stocks.ticker}
                      </h5>
                    </Card>
                  </>
                ))}
              </div>
            </Modal>

            <br />
           
            <Typography.Text type="secondary">
              {profile.length} added
            </Typography.Text>
          </Card>
          <Card title="Activity" style={{ flex: 1 }}>
            <Typography.Title level={4}>{profile.progress}</Typography.Title>{" "}
            <Typography.Text type="secondary">
              of 3 modules compeleted
            </Typography.Text>
            <Modal
              className="search"
              open={searchModal}
              onCancel={() => setSearchModal(false)}
              footer={"showing results for: " + search}
            >
              <div
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  paddingRight: "10px",
                  margin: "12px",
                }}
              >
                {results.map((stock, i) => (
                  !profile.list.includes(stock["1. symbol"]) && (
                  <Card
                    key={i}
                    style={{ margin: "5px", cursor: "pointer" }}
                    onClick={async () => {
                      const symbol = stock["1. symbol"];
                      const company = stock["2. name"];
                      setSelectedStock(symbol);
                      setSelectedCompany(company);
                      await daily(symbol);
                      setSearchModal(false);
                      setStockModal(true);
                    }}
                  >
                    <h4>Ticker: {stock["1. symbol"]}</h4>
                    <h3>Company: {stock["2. name"]}</h3>
                    <h4>Region: {stock["4. region"]}</h4>
                    <h5>Match: {stock["9. matchScore"]}</h5>

                    <p>Click me!</p>
                    </Card>
                  )
                ))}
              </div>
            </Modal>
            <Modal
              className="stock"
              open={stockModal}
              width={700}
              title={`Stock details: ${selectedStock}`}
              onCancel={() => {
                setStockModal(false);
                setSearchModal(true);
                setSelectedCompany("");
                setSelectedStock("");
              }}
              footer={
                <Button
                  onClick={() =>
                    handle_add_to_port(selectedStock, selectedCompany)
                  }
                >
                  Add to Portfolio
                </Button>
              }
            >
              <>
                <Tabs
                  items={[
                    {
                      key: "daily",
                      label: "Daily",
                      children:
                        dailyScatter.length > 0 ? (
                          <ScatterChart
                            width={600}
                            height={400}
                            series={[
                              {
                                label: "Daily High vs Close",
                                data: dailyScatter,
                              },
                            ]}
                            xAxis={[{ label: "Daily High ($)" }]}
                            yAxis={[{ label: "Daily Close ($)" }]}
                          />
                        ) : (
                          <Typography.Text>Loading daily data…</Typography.Text>
                        ),
                    },
                  ]}
                />
              </>
            </Modal>
          </Card>
        </Flex>
      </Flex>

      {profile.progress == 3 && (
        <div
          style={{
            display: "flex",
            width: "100%",
            margin: "10px",
            marginTop: "15px",
          }}
        >
          <Button
            style={{ alignSelf: "center", margin: "auto" }}
            onClick={() => toggle()}
            className="button-63"
          >
            SWITCH TO GOLD MODE!
          </Button>
        </div>
      )}
    </div>
  );
};


export default MainContent