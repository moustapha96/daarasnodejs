const router = require('express').Router();
const zoneController = require("../controllers/zone.controller");

//all user databases 
router.get("/", zoneController.getAll );
// user info
router.get("/:id", zoneController.info );
//update
router.put("/:id", zoneController.update );
//delete user 
router.delete("/:id", zoneController.delete);
//add new user 
router.post("/", zoneController.create );

module.exports = router;
