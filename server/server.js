const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

const mongoURI = process.env.MONGO_URI;
const adminRoutes = require("./routes/adminRoutes");

// זה החלק הקריטי! 
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://madortill.github.io"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// תוסיפי גם את זה — זה עוזר לטפל בבקשות Preflight (OPTIONS)
app.options("*", cors());

app.use(express.json());
app.use("/api/admin", adminRoutes);

const guestRoutes = require('./routes/guestRoutes');
app.use('/api/guest', guestRoutes);

const productsRoute = require('./routes/productsRoute');
app.use('/api/inventoryproducts', productsRoute);

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Failed to connect to MongoDB", err));

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});
