const routes = require("express").Router();
const {GetAllProducts,GetAProduct,PostAProduct,DeleteAProduct,UpdateAProduct} = require('../Controllers/ProductController')

// Get all Products
routes.get('/products',GetAllProducts);

// Get a Products 
routes.get('/product/:id', GetAProduct);

// Post a products
routes.post('/product', PostAProduct );

// Delete a Products 
routes.delete('/product/:id', DeleteAProduct);

// update a Products 
routes.patch('/product/:id', UpdateAProduct);





module.exports = routes;