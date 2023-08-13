const router = require("express").Router();
const { create, list, update, remove } = require("../controllers/employeeControllers");

router.post("/create", create);
router.get("/list", list);
router.post("/update/:id", update);
router.get("/remove/:id", remove);

module.exports = router;
