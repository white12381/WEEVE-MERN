const {productModels} = require("../Models/ProductModels");
const {errors} = require("../Models/ProductModels");

// get all products
const GetAllProducts = async (req,res) => {
    try{
const items = await productModels.FindAllItem();
res.status(200).json(items);
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Get item by id
const GetAProduct = async (req,res) => {
    const id = req.params.id;
  try{
    const item = await productModels.FindAnItemByID(id);
    res.status(200).json(item);
  }catch(error){
    res.status(400).json({error: "Invalid id"});
  }
}


// Get items by categories
const GetAllProductByCategory = async (req,res) => {
    const category = req.params.category;
  try{
    const item = await productModels.FindAnItemByCategory(category);
    res.status(200).json(item);
  }catch(error){
    res.status(400).json({error: "Invalid Category"});
  }
}


// Get items by name
const GetItemsByName = async (req,res) => {
  const ItemName = req.params.name;
  try{
    const item = await productModels.FindAnItemByName(ItemName);
    res.status(200).json(item);
  }catch(error){
    res.status(400).json({error: error.message});
  }
}


// Save an item
const PostAProduct = async  (req,res) => {
const items = req.body;

try{
const item = await productModels.AddItem(items);
res.status(200).json(item);
}
catch(error){
    res.status(400).json({error: error.message,errors});
}
}


// Delete an item
const DeleteAProduct =  async (req,res) => {
    const id = req.params.id;
    try{
      const item = await productModels.DeleteAnItemById(id);
      res.status(200).json(item);
    }catch(error){
      res.status(400).json({error: "Invalid Category"});
    }
}

// Update an item
const UpdateAProduct = async  (req,res) => {
    const id = req.params.id;
    const data = req.body;
    try{
      const item = await productModels.UpdateAnItemById(id,data);
      res.status(200).json(item);
    }catch(error){
      res.status(400).json({error: "Invalid Category"});
    }}


module.exports = {GetAllProducts,GetAProduct,PostAProduct,DeleteAProduct,UpdateAProduct,GetAllProductByCategory,GetItemsByName}