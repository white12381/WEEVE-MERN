const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
    ItemBonusPrice: {
        type: Number
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
    Warranty: {
        type: Number
    },
    Shipping: {
        type: Number
    },
    Category: {
        type: String,
        required: true
    },
    ItemMediaSize: {
        type: Array
    },
    MediaBase64: {
        type: [String],
        required: true
    }
},{timestamps: true })

ProductSchema.statics.AddItem = async function(items){
 let isError = false;
 let isImage = false;

 for(let j = 0;  j < items.MediaBase64.length; j++ ){
    if(items.MediaBase64[j].split('/')[0]  === 'data:image'){
     isImage = true;   
       break;
    }
}

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

     if(!isImage){
        throw Error("At least an Image is required");
     }



     items.ItemName = encodeURI(items.ItemName);

 const product = await this.create(items); 
 console.log(product._id);


 return product;

}

ProductSchema.statics.FindAllItem = async function(itemPage){
    const allItems = await this.find({},'-MediaBase64').skip((itemPage * 20)).limit(20);
    const items = await this.find({}).skip(itemPage).skip((itemPage * 20)).limit(20);
    const allItemsLength = await this.countDocuments({});
    const ItemPicture = [];
    for(let i = 0; i < items.length; i++){
        allItems[i].ItemName = decodeURI(allItems[i].ItemName); 
        for(let j = 0;  j < items[i].MediaBase64.length; j++ ){
         if((items[i].MediaBase64[j].split('/')[0]  === 'data:image')){
            ItemPicture.push(items[i].MediaBase64[j]); 
            break;
         }
        }
    } 
    return {allItems,ItemPicture, allItemsLength};
}

ProductSchema.statics.FindAnItemByID = async function(id){
    const items = await this.findById(id);
    if(!items){
        throw Error("Invalid Id")
    }
    items.ItemName = decodeURI(items.ItemName);
    return items;
}
 

ProductSchema.statics.FindAnItemByCategory = async function(category,itemPage){
    const items = await this.find({Category: {$regex : `${category}`,$options: 'i'}}).skip((itemPage * 20)).limit(20);
    const allItems =  await this.find({Category: {$regex : `${category}`,$options: 'i'}},'-MediaBase64').skip((itemPage * 20)).limit(20);
    const allItemsLength = await this.countDocuments({Category: {$regex : `${category}`,$options: 'i'}});
    var ItemPicture = [];
    if(items.length === 0){
        throw Error("Invalid Category");
    }
    for(let i = 0; i < items.length; i++){
        allItems[i].ItemName = decodeURI(allItems[i].ItemName); 
        for(let j = 0;  j < items[i].MediaBase64.length; j++ ){
            if(items[i].MediaBase64[j].split('/')[0]  === 'data:image'){
               ItemPicture.push(items[i].MediaBase64[j]);
               break;
            }
        }
        }    
    return {allItems, ItemPicture,allItemsLength};
}


ProductSchema.statics.FindAnItemByName = async function(name,itemPage){
    name = encodeURI(name);
    const filters = { ItemName:  { $search: name } }
    const filter = { ItemName: {$regex : `${name}`,$options: 'i'}};
    const items = await this.find(filter).skip((itemPage * 20)).limit(20);
    const allItems = await this.find(filter,'-MediaBase64').skip((itemPage * 20)).limit(20);
    const allItemsLength = await this.countDocuments(filter);
    var ItemPicture = [];
    if(items.length === 0){ 
        throw Error("Invalid Name");
    }
    for(let i = 0; i < items.length; i++){
        allItems[i].ItemName = decodeURI(items[i].ItemName);
        for(let j = 0;  j < items[i].MediaBase64.length; j++ ){
            if(items[i].MediaBase64[j].split('/')[0]  === 'data:image'){
               ItemPicture.push(items[i].MediaBase64[j]);
               break;
            }
        }
    }
    return {allItems,ItemPicture, allItemsLength};
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
    const itemUpdate = await this.findOneAndUpdate(items,datas);
    return itemUpdate;
}

var productModels = mongoose.model("ProductsItems",ProductSchema);
module.exports = {productModels,errors}
