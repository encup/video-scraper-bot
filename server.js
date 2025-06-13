const express = require("express");
const cors = require("cors");
const scrapeRoute = require("./api/scrape");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use("/api/scrape", scrapeRoute);

app.get("/", (req, res) => {
  res.send("✅ Video Scraper API aktif!");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
