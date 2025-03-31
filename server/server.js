const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI;

const adminRoutes = require("./routes/adminRoutes");
const guestRoutes = require("./routes/guestRoutes");
const productsRoutes = require('./routes/productsRoute');
const categoriesRoutes = require('./routes/categoriesRoutes');
const orderRoutes = require('./routes/ordersRoute');
console.log("✅ ordersRoute loaded");

// הגדרות CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://madortill.github.io",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.use(express.json());

// ראוטים
app.use("/api/admin", adminRoutes);
app.use("/api/guest", guestRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/orders', orderRoutes);

// חיבור למסד הנתונים
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
