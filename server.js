const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const setUser = require("./middleware/setUser");
const Product = require("./models/Product");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(setUser);

// Set view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/manager", require("./routes/manager"));
app.use("/products", require("./routes/product"));

// Home route
app.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory")
      .populate("brand");
    res.render("user/index", { products });
  } catch (err) {
    console.error(err);
    res.render("user/index", { products: [] });
  }
});
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
