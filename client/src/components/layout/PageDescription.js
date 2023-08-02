import React,{ useState } from "react";
import { Card, Radio, Button } from "antd";
import {
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  ShareAltOutlined
} from "@ant-design/icons";

const PageDescription = ({page}) => {
  const [size, setSize] = useState("");
  const pageDesc = {
    'backtesting' : {
      'title':'Backtesting',
      'description': "Backtest trading strategies across a range of historical dates. Test against specific symbols or use position sizing rules to simulate multi-holding portfolios."
    },
    'screening': {
      'title':"Screening",
      "description":"Backtest trading strategies across a range of historical dates. Test against specific symbols or use position sizing rules to simulate multi-holding portfolios."
    },
    'charts': {
      "title":"Charts","description":
      "Backtest trading strategies across a range of historical dates. Test against specific symbols or use position sizing rules to simulate multi-holding portfolios."
    },
    'patterns': {
      "title":"Patterns",
      "description":"Backtest trading strategies across a range of historical dates. Test against specific symbols or use position sizing rules to simulate multi-holding portfolios."
    },
    'Custom Strategy': {
      "title":"Backtesting : Custom Strategy",
      "description":"Compare all tests for a Strategy. Click on a Test number or Time and drill-down to see the detailed criteria and results. You can then use that Test criteria as the basis for a new Test."
    },
  }

  return (
    <Card
      style={{ backgroundColor: "lightgrey" }}
      className="description-card"
      key="backtesting"
      size="small"
    >
      <div style={{ textAlign: "start", height: "100%", padding: "0px" }}>
        <h4>{pageDesc[page].title}</h4>
        <span>
          {pageDesc[page].description}
        </span>
        <div style={{ width: "100%", display: "flex" }}>
          <Radio.Group
            onChange={(e) => setSize(e.target.value)}
            style={{ margin: "0 0 0 auto" }}
          >
            <Radio.Button value="facebook">
              <FacebookOutlined />
            </Radio.Button>
            <Radio.Button value="twitter">
              <TwitterOutlined />
            </Radio.Button>
            <Radio.Button value="linkedin">
              <LinkedinOutlined />
            </Radio.Button>
            <Radio.Button value="link">
              <ShareAltOutlined />
            </Radio.Button>
          </Radio.Group>
          <Button type="primary" style={{ marginLeft: "10px" }}>
            Tutorial
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PageDescription;
