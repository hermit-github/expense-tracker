const BigPromise = require("../middlewares/bigPromise")
const Category = require("../model/category")
const Transaction = require("../model/tansaction")
const CustomError = require("../utils/customError")

exports.getCategories = BigPromise( async (req,res,next) => {

    let categories = await Category.find();

    if(!categories){
        res.status(200).json({success:true,"message":"No Categories found!"})
    }

    categories = categories.map( v => Object.assign({},{type:v.type,color:v.color}));

    res.status(200).json({
        success:true,
        categories
    })
})

exports.addCategory = BigPromise( async (req,res,next) => {

    const {type,color} = req.body;

    if(!type && !color){
        return next( new CustomError("Type & Category required!",401));
    }

    const category = await Category.create({
        type,
        color
    })

    res.status(200).json({
        success:true,
        category
    })
})

exports.removeCategory = BigPromise( async (req,res,next) => {
    
    const category = await Category.findById(req.params.categoryId);

    if(!category){
        return next( new CustomError("Category doesn't exist",401));
    }

    await category.remove();

    res.status(200).json({
        success:true,
        message:"Category removed successfully!"
    })
})

exports.addTransaction = BigPromise( async (req,res,next) => {
    const {name,type,amount} = req.body;

    if(!name && !type && !amount){
        return next(new CustomError("Post HTTP Data not provided!",400));
    }

    const transaction = await Transaction.create({
        name,
        type,
        amount
    })

    res.status(200).json({
        success:true,
        transaction
    })

})

exports.getTransactions = BigPromise( async (req,res,next) => {
    const transactions = await Transaction.find();

    res.status(200).json({
        success:true,
        transactions
    })
})

exports.deleteTransactions = BigPromise( async (req,res,next) => {
    const transaction = await Transaction.findById(req.params.transactionId);

    if(!transaction) {
        return next(new CustomError("Transaction not found!",401));
    }

    await transaction.remove().catch((error) => {
        res.status(500).json(`Error while deleting transaction ${error}`)
    });

    res.status(200).json({
        success:true,
        message:"Trancastion deleted successfully"
    })
})

exports.getLabels = BigPromise( async (req,res,next) => {
    Transaction.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"type",
                foreignField:"type",
                as:"category_info"
            }
        },
        {
            $unwind:"$category_info"
        }
    ]).then(result => {

        const data = result.map( v => Object.assign({},{id:v._id,name:v.name,type:v.type,amount:v.amount,date:v.date,color:v.category_info.color}))

        res.status(200).json({
            success:true,
            data
        })
    })
    .catch(error => {
            res.status(400).json("Lookup Collection Error")
        })
    })
