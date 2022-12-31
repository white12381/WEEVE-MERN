const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require('fs');  
const multer = require('multer');
let errors = [];

const ProductSchema = new Schema({
    ItemName:{
        type: String,
        required: true
    },
    ItemPrice: {
        type: Number,
        required: true
    },
    ProductName: {
        type: String,
        required: true
    }, 
    OverView : {
        type: String
    }, 
    Description: {
        type: String
    },
    MediaBase64: {
        type: [String],
        required: true
    },
    Warranty: {
        type: Number
    },
    Shipping: {
        type: Number
    },
    Category: {
        type: String,
        required: true
    }
},{timestamps: true })

ProductSchema.statics.AddItem = async function(items){
 let isError = false;
    if(!items.ItemName){
        errors.push("ItemName");
        isError = true;
    }
    if(!items.ItemPrice){
        errors.push("ItemPrice");
        isError = true;
    }
    if(!items.ProductName){
        errors.push("ProductName");
        isError = true;
    }
     
    if(!items.Category){
        errors.push(" Category");
        isError = true;
    }

    if(isError){
        throw Error("All feilds are required");
     }

     items.ItemName = encodeURI(items.ItemName);

 const product = await this.create(items); 
 console.log(product._id);

 try{
    
    if(!fs.existsSync(`public/${product._id}`)){
        fs.mkdirSync(`public/${product._id}`);
        console.log(`${product._id} created`);
    }
 } catch(err){
    console.error(err);
 }

 return product;

}

ProductSchema.statics.FindAllItem = async function(){
    const items = await this.find({});
    for(let i = 0; i < items.length; i++){
        items[i].ItemName = decodeURI(items[i].ItemName);
    }
    return items;
}

ProductSchema.statics.FindAnItemByID = async function(id){
    const items = await this.findById(id);
    if(!items){
        throw Error("Invalid Id")
    }
    items.ItemName = decodeURI(items.ItemName);
    return items;
}

ProductSchema.statics.FindAnItemByCategory = async function(category){
    category = encodeURI(category);
    const items = await this.find({Category: {$regex : `${category}`,$options: 'i'}});
    if(items.length === 0){
        throw Error("Invalid Category");
    }
    for(let i = 0; i < items.length; i++){
        items[i].ItemName = decodeURI(items[i].ItemName);
    }    
    return items;
}


ProductSchema.statics.FindAnItemByName = async function(name){
    name = encodeURI(name);
    const filters = { ItemName:  { $search: name } }
    const filter = { ItemName: {$regex : `${name}`,$options: 'i'}};
    const items = await this.find(filter);
 
    if(items.length === 0){ 
        throw Error("Invalid Name");
    }
    for(let i = 0; i < items.length; i++){
        items[i].ItemName = decodeURI(items[i].ItemName);
    }
    return items;
}


ProductSchema.statics.DeleteAnItemById = async function(id){
    const items = await this.findById(id);
    if(!items){
        throw Error("Invalid Id")
    }
    const itemDelete = await this.deleteOne({_id: id});
    return itemDelete;
}

ProductSchema.statics.UpdateAnItemById = async function(id,datas){
    const items = await this.findById(id);
    if(!items){
        throw Error("Invalid Id")
    }
    const itemUpdate = await this.update(datas);
    return itemUpdate;
}

var productModels = mongoose.model("ProductsItems",ProductSchema);
module.exports = {productModels,errors}
