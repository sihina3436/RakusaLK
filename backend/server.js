const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("☑️ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/categories", require("./routes/category.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/colors", require("./routes/colors.routes"));
app.use("/api/stats", require("./routes/stats.routes"));
app.use("/api/sizes", require("./routes/size.routes"));
app.use("/api/upload", require("./routes/upload.routes"));
app.use("/api/reviews", require("./routes/review.routes"));

app.get("/", (req, res) => {
  res.send("RakusaLK Backend Running 😈");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});