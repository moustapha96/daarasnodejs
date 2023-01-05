const router = require('express').Router();
const regionController = require("../controllers/region.controller");

//all user databases 
router.get("/", regionController.getAll );
// user info
router.get("/:id", regionController.info );
//update
router.put("/:id", regionController.update );
//delete user 
router.delete("/:id", regionController.delete);
//add new user 
router.post("/", regionController.create );

module.exports = router;
