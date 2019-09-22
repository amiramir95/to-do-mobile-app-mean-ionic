const express = require("express");
const router = express.Router();

const auth = require('../middleware/auth');

const ListController = require("../controllers/list");

router.get("/userId/:userId", auth, ListController.getListByUserId);
router.get("/:id", auth, ListController.getOneList);
router.post("", auth, ListController.createList);
router.put("/:id", auth, ListController.updateList);
router.delete("/:id", auth, ListController.deleteList);


module.exports = router;