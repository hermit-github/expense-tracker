const router = require("express").Router();
const {getCategories,
    addCategory,
    addTransaction,
    getTransactions,
    deleteTransactions,
    getLabels,
    removeCategory} = require("../controller/controller")

router.route("/category/:categoryId").delete(removeCategory)
router.route("/categories").get(getCategories).post(addCategory)
router.route("/transaction").post(addTransaction)
router.route("/transaction/:transactionId").delete(deleteTransactions)
router.route("/transactions").get(getTransactions)
router.route("/labels").get(getLabels)



module.exports = router;