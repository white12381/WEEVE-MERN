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
    ProductName: {
        type: String,
        required: true
    },
    ItemPictures: {
        type: Array,
        required: true,
         validate : {
            validator : function(array) {
              return array.every((v) => typeof v === 'string');
            }
          }
    },
    OverView : {
        type: String,
        required: true
    },
    OverViewUL: String,
    Description: {
        type: String,
        required: true
    },
    DescriptionUL: String,
    Warranty: {
        type: Number,
        required: false
    },
    Shipping: {
        type: Number,
        required: false
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
    if(!items.ItemPictures){
        errors.push("ItemPictures");
        isError = true;
    }
    if(!items.OverView){
        errors.push("OverView")
        isError = true;
    }
    if(!items.Description){
        errors.push(" Description");
        isError = true;
    }
    if(!items.Category){
        errors.push(" Category");
        isError = true;
    }

    if(isError){
        throw Error("All feilds are required");
     }

 const product = await this.create(items);

 return product;

}

ProductSchema.statics.FindAllItem = async function(){
    const items = await this.find({});
    return items;
}

ProductSchema.statics.FindAnItemByID = async function(id){
    const items = await this.findById(id);
    if(!items){
        throw Error("Invalid Id")
    }
    return items;
}

ProductSchema.statics.FindAnItemByCategory = async function(category){
    const items = await this.find({"Category": category});
    if(items.length === 0){
        throw Error("Invalid Category");
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
