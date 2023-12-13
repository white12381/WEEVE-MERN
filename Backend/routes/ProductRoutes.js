const routes = require("express").Router(); 
const path = require('path');
const {GetAllProducts,GetItemsByName,GetAllProductByCategory,GetAProduct,PostAProduct,DeleteAProduct,UpdateAProduct} = require('../Controllers/ProductController')

 
 
// Get all Product
routes.get('/products',GetAllProducts);

// Get a Product
routes.get('/product/:id', GetAProduct);

// Get all product by category
routes.get('/product/category/:category',GetAllProductByCategory);

// Get all items by name
routes.get('/product/name/:name',GetItemsByName);

// Post a products
routes.post('/product',PostAProduct );

// Delete a Products 
routes.delete('/product/:id', DeleteAProduct);

// update a Products 
routes.patch('/product/:id', UpdateAProduct);





module.exports = routes;