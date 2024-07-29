const { Schema } = require("mongoose");

const weeveCharging = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    phoneNumber: String, 
    gender: String,
    status: String,
    percentage: Number, lastUpdate: String
}, {timestamps: true});
export default weeveCharging;