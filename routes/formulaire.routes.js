const router = require("express").Router();
const formulaireController = require("../controllers/formulaire.controller");

//add new
router.post("/", formulaireController.create);
//all formulaire databases
router.get("/", formulaireController.getAll);
//info
router.get("/:id", formulaireController.info);
//update
router.put("/:id", formulaireController.update);
//delete
router.delete("/:id", formulaireController.delete);
// delete all
router.delete("/", formulaireController.deleteAll);

router.post("/logo", formulaireController.updateLogo);

router.post("/menu", formulaireController.menu);
// find one form by title
router.get("/title/:title", formulaireController.findByTitle);

module.exports = router;
