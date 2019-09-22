const express = require("express");
const router = express.Router();

const ListController = require("../controllers/list");

router.get("/userId/:userId", ListController.getListByUserId);
router.get("/:id", ListController.getOneList);
router.post("", ListController.createList);
router.put("/:id", ListController.updateList);
router.delete("/:id", ListController.deleteList);


module.exports = router;