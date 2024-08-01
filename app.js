const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const coinRoutes = require("./routes/coinRoutes");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

connectDB();
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/coins", coinRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
