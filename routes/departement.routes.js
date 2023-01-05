const router = require('express').Router();
const departementController = require("../controllers/departement.controller");

//all user databases 
router.get("/", departementController.getAll );
// user info
router.get("/:id", departementController.info );
//update
router.put("/:id", departementController.update );
//delete user 
router.delete("/:id", departementController.delete);
//add new user 
router.post("/", departementController.createDepartement );
//add zone to departement
router.patch("/zone/:id",departementController.addZone);
module.exports = router;
