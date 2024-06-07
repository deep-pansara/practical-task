const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const path = require("path");

app.use(express.json());

app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);
app.use("/api", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
