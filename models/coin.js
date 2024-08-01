const mongoose = require("mongoose");

const CoinSchema = new mongoose.Schema({
  coinName: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Coin", CoinSchema);
