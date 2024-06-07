# Product Management API

This project is a Node.js-based API for managing a collection of products. It supports CRUD (Create, Read, Update, Delete) operations and uses a JSON file for data storage instead of a database. The API includes functionality for handling product images and supports pagination for listing active products.

## Features

- Add a new product
- Get product information by productId
- List active products with pagination
- Update product details by productId
- Delete a product by productId

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/product-management-api.git
   cd product-management-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`.

## API Endpoints

### Add a new product

- **URL**: `/api/products`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `productId` (required): Unique ID for the product
  - `productName` (required): Name of the product
  - `productDescription` (required): Description of the product
  - `productImage` (required): Image file of the product
  - `isActive` (required): "true" or "false" indicating if the product is active
