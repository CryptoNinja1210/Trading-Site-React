import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
// import axios from "axios";
import _ from '../../db/stockServer.json';
// import ChartExample from "./Chart/chart1";
import { getStock } from "../../actions/stock";

// var KiteConnect = require("kiteconnect").KiteConnect;

const MarketData = () => {

  const dispatch = useDispatch();
  const {stock, loading} = useSelector(({stock}) => stock);
  
  useEffect(() => {
    dispatch(getStock(_[0]));
  },[getStock]);

  console.log(stock);

  // var kc = new KiteConnect({
  //   api_key: "https://api.kite.trade/instruments/NSE",
  // });
  
  // function init() {
  //   // Fetch equity margins.
  //   // You can have other api calls here.
  //   kc.getMargins()
  //     .then(function (response) {
  //       console.log(response)
  //       // You got user's margin details.
  //     })
  //     .catch(function (err) {
  //       // console.log(err)
  //       console.log('init/getMargins catched error')
  //       // Something went wrong.
  //     });
  // }

  // kc.generateSession("request_token", "api_secret")
  //   .then(function (response) {
  //     init();
  //   })
  //   .catch(function (err) {
  //       // console.log(err)
  //       console.log('generateSession catched error');
  //   });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://api.kite.trade/instruments/NSE"
  //       );
  //       setData(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return loading || stock === null ? (
    <Spinner />
  ) : (
    <section className="container-fluid"  >
      <div>
        <h1>Market Data</h1>
        <ul>
          {/* {data.map((instrument) => (
            <li key={instrument.tradingsymbol}>{instrument.name}</li>
          ))} */}
        </ul>
      </div>
      <div>
        {/* <ChartExample /> */}
      </div>
    </section>
  );
}

export default MarketData;

// MarketData.propTypes = {
//   getStock: PropTypes.func.isRequired,
//   stock: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//   stock: state.stock
// });

// export default connect(mapStateToProps, { getStock })(MarketData);
