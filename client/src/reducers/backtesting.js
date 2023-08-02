import {
    DELETE_STRATEGY,
    GET_DEFAULT_STRATEGIES,
    GET_STRATEGIES,
    POST_STRATEGY,
    POST_STRATEGY_TEST,
    STRATEGIES_ERROR
} from '../actions/types';

const initialState = {
    defaultStrategies: [],
    strategies: [
        {
          key: "123",
          name: "Custom Strategy1",
          lastTest: "Test 1",
          lastTestTime: "5/26/2023 11:58:AM",
          totalTests: "1",
          comments: "",
          symbolsForPerformanceChart: "SPX Xo",
          tests:{
            name: "Test 1",
            time: "5/26/2023 11:58:AM",
            status: "Complete",
            symbols: "Nasdaq GM Nasdaq GS NYSE",
            criteria: "B: Close xa 100 in last 1 bars",
            prioritizeSymbols: "Highest SMA (Volume 30)",
            testPeriods: "4/13/2023 - 5/12/2023",
            startingEquity: 1_000_000,
            positionSizing:"10L 10S % Current Equity",
            totalProfit: -7_548.53,
            openProfit: 15_204.20,
            returnOnEquity: -0.75,
            annualizedReturn: -8.81,
            maxDrawdown: -2.55,
            sharpeRatio: -0.64,
            percentProfitable: 18.18,
            winningLosingProfitRatio: 0.57,
          },
        },
        {
          key: "2",
          name: "Custom Strategy2",
          lastTest: "Test 1",
          lastTestTime: "5/26/2023 11:58:AM",
          totalTests: "1",
          comments: "",
          symbolsForPerformanceChart: "SPX Xo",
          tests:{
            name: "Test 1",
            time: "5/26/2023 11:58:AM",
            status: "Complete",
            symbols: "Nasdaq GM Nasdaq GS NYSE",
            criteria: "B: Close xa 100 in last 1 bars",
            prioritizeSymbols: "Highest SMA (Volume 30)",
            testPeriods: "4/13/2023 - 5/12/2023",
            startingEquity: 1_000_000,
            positionSizing:"10L 10S % Current Equity",
            totalProfit: -7_548.53,
            openProfit: 15_204.20,
            returnOnEquity: -0.75,
            annualizedReturn: -8.81,
            maxDrawdown: -2.55,
            sharpeRatio: -0.64,
            percentProfitable: 18.18,
            winningLosingProfitRatio: 0.57,
          },
        },
        {
          key: "3",
          name: "Custom Strategy3",
          lastTest: "Test 1",
          lastTestTime: "5/26/2023 11:58:AM",
          totalTests: "1",
          comments: "",
          symbolsForPerformanceChart: "SPX Xo",
          tests:{
            name: "Test 1",
            time: "5/26/2023 11:58:AM",
            status: "Complete",
            symbols: "Nasdaq GM Nasdaq GS NYSE",
            criteria: "B: Close xa 100 in last 1 bars",
            prioritizeSymbols: "Highest SMA (Volume 30)",
            testPeriods: "4/13/2023 - 5/12/2023",
            startingEquity: 1_000_000,
            positionSizing:"10L 10S % Current Equity",
            totalProfit: -7_548.53,
            openProfit: 15_204.20,
            returnOnEquity: -0.75,
            annualizedReturn: -8.81,
            maxDrawdown: -2.55,
            sharpeRatio: -0.64,
            percentProfitable: 18.18,
            winningLosingProfitRatio: 0.57,
          },
        },
        {
          key: "4",
          name: "Custom Strategy4",
          lastTest: "Test 1",
          lastTestTime: "5/26/2023 11:58:AM",
          totalTests: "1",
          comments: "",
          symbolsForPerformanceChart: "SPX Xo",
          tests:{
            name: "Test 1",
            time: "5/26/2023 11:58:AM",
            status: "Complete",
            symbols: "Nasdaq GM Nasdaq GS NYSE",
            criteria: "B: Close xa 100 in last 1 bars",
            prioritizeSymbols: "Highest SMA (Volume 30)",
            testPeriods: "4/13/2023 - 5/12/2023",
            startingEquity: 1_000_000,
            positionSizing:"10L 10S % Current Equity",
            totalProfit: -7_548.53,
            openProfit: 15_204.20,
            returnOnEquity: -0.75,
            annualizedReturn: -8.81,
            maxDrawdown: -2.55,
            sharpeRatio: -0.64,
            percentProfitable: 18.18,
            winningLosingProfitRatio: 0.57,
          },
        },
        {
          key: "5",
          name: "Custom Strategy5",
          lastTest: "Test 1",
          lastTestTime: "5/26/2023 11:58:AM",
          totalTests: "1",
          comments: "",
          symbolsForPerformanceChart: "SPX Xo",
          tests:{
            name: "Test 1",
            time: "5/26/2023 11:58:AM",
            status: "Complete",
            symbols: "Nasdaq GM Nasdaq GS NYSE",
            criteria: "B: Close xa 100 in last 1 bars",
            prioritizeSymbols: "Highest SMA (Volume 30)",
            testPeriods: "4/13/2023 - 5/12/2023",
            startingEquity: 1_000_000,
            positionSizing:"10L 10S % Current Equity",
            totalProfit: -7_548.53,
            openProfit: 15_204.20,
            returnOnEquity: -0.75,
            annualizedReturn: -8.81,
            maxDrawdown: -2.55,
            sharpeRatio: -0.64,
            percentProfitable: 18.18,
            winningLosingProfitRatio: 0.57,
          },
        }
    ],
    loading: false,
    error: {}
};

function backtestingReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_DEFAULT_STRATEGIES:
            return {
                ...state,
                defaultStrategies: payload,
                loading: false,
            }
        case GET_STRATEGIES:
            return {
                ...state,
                strategies: payload,
                loading: false,
            }
        case POST_STRATEGY:
            // console.log(`Custome Strategy${Number(state.strategies[state.strategies.length-1].name.slice(15,state.strategies[0].name.length))+1}`)
            return {
                ...state,
                strategies: [ ...state.strategies, payload ],
                loading: false,
            }
        // case POST_STRATEGY_TEST:
        //     return {
        //         ...state,
        //         strategies: [...state.strategies, ]
        //     }
        case DELETE_STRATEGY:
            console.log(state.strategies.filter((item)=> payload.indexOf(item.key) == -1))
            return {
                ...state,
                strategies: state.strategies.filter((item)=>payload.indexOf(item.key) == -1),
                loading: false
            }
        case STRATEGIES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        default:
            return state;
    }
}

export default backtestingReducer;