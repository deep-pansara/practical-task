const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/products.json");
const publicPath = path.join(__dirname, "../public/images");

// Read JSON file
const readJSONFile = () => {
  return JSON.parse(fs.readFileSync(dataPath));
};

// Write JSON file
const writeJSONFile = data => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

//1. controller to insert products(required fields productId, productName, product-description, product images, isActive) & save product image in Public directory
exports.insertProduct = (req, res) => {
  const { productId, productName, productDescription, isActive } = req.body;
  const productImage = req.file ? req.file.filename : null;
  const products = readJSONFile();
  const newProduct = {
    productId,
    productName,
    productDescription,
    productImage,
    isActive: isActive === "true",
  };
  products.push(newProduct);
  writeJSONFile(products);
  res.status(201).send(newProduct);
};

//2. controller to get product information by productId
exports.getProductById = (req, res) => {
  const { productId } = req.params;
  const products = readJSONFile();
  const product = products.find(p => p.productId === Number(productId));
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }
  res.send(product);
};

//3. controller to get a list of active products available in the collection(Max 10 per page)
exports.getActiveProducts = (req, res) => {
  const { page = 1 } = req.query;
  const products = readJSONFile();
  const activeProducts = products.filter(p => p.isActive);
  const startIndex = (page - 1) * 10;
  const paginatedProducts = activeProducts.slice(startIndex, startIndex + 10);
  res.send({ results: paginatedProducts.length, data: paginatedProducts });
};

//4. controller to update the product by productId
exports.updateProductById = (req, res) => {
  console.log(req.body);
  const { productId } = req.params;
  const { productName, productDescription, isActive } = req.body;
  const productImage = req.file ? req.file.filename : null;
  const products = readJSONFile();
  const productIndex = products.findIndex(
    p => p.productId === Number(productId)
  );
  if (productIndex === -1) {
    return res.status(404).send({ message: "Product not found" });
  }
  const updatedProduct = {
    ...products[productIndex],
    productName: productName || products[productIndex].productName,
    productDescription:
      productDescription || products[productIndex].productDescription,
    isActive:
      isActive !== undefined
        ? isActive === "true"
        : products[productIndex].isActive,
    productImage: productImage || products[productIndex].productImage,
  };
  products[productIndex] = updatedProduct;
  writeJSONFile(products);
  res.send(updatedProduct);
};

//5.controller to delete a product by productId
exports.deleteProductById = (req, res) => {
  const { productId } = req.params;
  const products = readJSONFile();
  const productIndex = products.findIndex(
    p => p.productId === Number(productId)
  );
  if (productIndex === -1) {
    return res.status(404).send({ message: "Product not found" });
  }
  const [deletedProduct] = products.splice(productIndex, 1);
  writeJSONFile(products);
  res.send("Product deleted successfully");
};
