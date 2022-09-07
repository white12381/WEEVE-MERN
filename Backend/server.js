const { json } = require("express");
const express = require("express");
const app = express();
require("dotenv").config();
const productsRoutes = require("./routes/ProductRoutes");


// Connect to database
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI).then( ()  => {
// Listen to request
app.listen(process.env.PORT,( () => console.log(`connected to database and running on port 4000 ${process.env.PORT}`)));
})

// MiddleWares
app.use(express.json());
app.use('/api/',productsRoutes);




app.use( (req,res) => {
    res.status(404).json({error: "404 Page not found"});

})
