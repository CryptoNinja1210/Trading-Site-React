const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StrategySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String
  },
  lastTest: {
    type: String,
	default:'Test 1'
  },
  lastTestTime: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: String
  },
  symbolsForPerformanceChart: {
    type: String,
	default: 'SPX.XO'
  },
  test: [
    {
		name: {
			type: String,
			default:'Test 1'
		},
		time: {
			type: Date,
			default: Date.now
		},
		status: {
			type: String,
			default:'Completed'
		},
		symbols: {
			type: String,
			default:'Nasdaq GM Nasdaq GS NYSE'
		},
		criteria: {
			type: String,
			default:'B: Close xb 100 in last 1 bars'
		},
		prioritizeSymbols: {
			type: String,
			default:'Highest SMA (Volume 30)'
		},
		testPeriod: {
			type: String,
			default: "10L 10S % Current Equity"
		},
		startingEquity: {
			type: Number,
			default: 1_000_000
		},
		positionSizing: {
			type: String,
			default:'10L 10S % Current Equity'
		},
		totalProfit: {
			type: Number,
			default: -7_548.53
		},
		openProfit: {
			type: Number,
			default: 15_204.20
		},
		returnOnEquity: {
			type: Number,
			default: -0.75
		},
		annualizedReturn: {
			type: Number,
			default: -0.75
		},
		maxDrawdown: {
			type: Number,
			default: -8.81
		},
		sharpRatio: {
			type: Number,
			default: -2.55
		},
		percentProfitable: {
			type: Number,
			default: -0.64
		},
		winningLosingProfit: {
			type: Number,
			default: -0.57
		}
    }
  ]
});

module.exports = mongoose.model('strategy', StrategySchema);
