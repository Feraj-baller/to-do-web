const express = require("express")
const router = express.Router()

const {getAllItems, createItem, getSingleItem, updateItem, deleteItem} = require("../controllers/items")

router.route("/").get(getAllItems).post(createItem)
router.route("/:id").get(getSingleItem).patch(updateItem).delete(deleteItem)

module.exports = router