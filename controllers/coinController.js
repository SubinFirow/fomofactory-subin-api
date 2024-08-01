const Coin = require("../models/coin");

const cron = require("node-cron");
const axios = require("axios");

const fetchCryptoPrices = async () => {
  try {
    const coins = ["bitcoin", "ethereum", "cardano", "solana", "dogecoin"];

    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(
        ","
      )}&vs_currencies=usd`,
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-xmmo3FFrUiEBz51iuf3ZMUGj",
      },
    };
    axios
      .request(options)
      .then(async function (response) {
        const prices = response.data;
        for (const coin of coins) {
          const currentPrice = prices[coin].usd;
          const saved = await Coin.create({
            coinName: coin,
            currentPrice: currentPrice,
            lastUpdated: new Date(),
          });
          if (saved) {
            console.log("Data Saved");
          }
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
  }
};

cron.schedule("*/5 * * * * *", () => {
  console.log("Cron is running every 5 seconds");
  fetchCryptoPrices();
});

const fetch = async (req, res) => {
  try {
    const activeItem = req.body.params.activeItem;
    const data = await Coin.find({ coinName: activeItem })
      .sort({ lastUpdated: -1 })
      .limit(20);

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No cryptocurrencies found with this name" });
    }
    res.send({ message: "Data Fetched", data: data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  fetch,
};
