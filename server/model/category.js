const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    type:{
        type:String,
        default:"Investment"
    },
    color:{
        type:String,
        default:"#FCBE44",
        unique:[true,"Color Hex Code has to be uniqe!"]
    }
})


module.exports = mongoose.model("Category",categorySchema)