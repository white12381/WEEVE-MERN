const express = require("express");
const cors = require("cors")
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
app.use(express.urlencoded({ limit: '500mb', extended: false}));
app.use(express.static('public'));
app.use(cors());
app.use(express.json({limit: '500mb'}));
app.use((req,res,next) => {
    console.log(`Request path is ${req.url}, Request method is ${req.method}`);
    next();
});
app.use('/admin/',productsRoutes);




app.use( (req,res) => {
    res.status(404).json({error: "404 Page not found"});

})
