const express = require('express');
const app = express();
const fs = require('fs');

// Read the item_list.json file
const itemListData = fs.readFileSync('item_list.json');
const itemList = JSON.parse(itemListData);

// API 1: Product List
app.get('/api/products/list', (req, res) => {
  const size = parseInt(req.query.size); // Number of items per page
  const page = parseInt(req.query.page); // Page offset

  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;

  const paginatedList = itemList.slice(startIndex, endIndex).map(item => ({
    id: item.id,
    item_name: item.item_name,
    item_image: item.item_image,
    item_price: item.item_price
  }));

  res.json(paginatedList);
});

// API 2: Product Detail
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  const product = itemList.find(item => item.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
