
const GetAllProducts =  (req,res) => {
    res.json({response: "all Products api"});
}

const GetAProduct = (req,res) => {
    res.json({response: `Product ${req.params.id}`});
}

const PostAProduct = (req,res) => {
    res.json({response: "Products post"});
}

const DeleteAProduct = (req,res) => {
    res.json({response: `Product ${req.params.id} deleted`});
}

const UpdateAProduct = (req,res) => {
    res.json({response: `Product ${req.params.id} updated`});
}

module.exports = {GetAllProducts,GetAProduct,PostAProduct,DeleteAProduct,UpdateAProduct}