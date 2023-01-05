const RegionModel = require("../models/region.model");
const ObjectID = require("mongoose").Types.ObjectId;


module.exports.new = async (req, res) => {
    const { nom } = req.body;

    if (!req.body.nom  ) {
        res.status(400).send({ message: "data can not be null!" });
        return;
    }
    try {
        const region = await RegionModel.create({ nom });
        res.status(201).json({ region: region._id });
    } catch (err) {
        res.status(500).send({ err });
    }
}

module.exports.getAll = async (req, res) => {
    const regions = await RegionModel.find();
    res.status(200).json(regions);
}

module.exports.info = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknow : " + req.params.id);

    RegionModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown" + err);
    });
}


module.exports.delete = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await RegionModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "succesfully deletected. " });
    } catch (error) {
        res.status(500).json({ message: error });
    }

}

// Update a Formulaire by the id in the request
module.exports.update = async (req, res) => {


    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknow : " + req.params.id);

   

    await RegionModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Formulaire with id=${req.params.id}. Maybe Formulaire was not found!`,
                });
            } else res.send({ message: "Formulaire was updated successfully." });
        })
        .catch((err) => {
            res.status(500).send({
                message: err,
            });
        });
};

//create new formualire 
module.exports.create = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        res.status(400).send({ message: "nom can not be empty!" });
        return;
    }
    // Create a Formulaire
    const region = new RegionModel({
        nom: req.body.nom
    });

    // Save Formulaire in the database
    RegionModel.create(region)
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Formulaire.",
            });
        });
};

// Delete all Formulaires from the database.
module.exports.deleteAll = (req, res) => {
    RegionModel.deleteMany({})
        .then((data) => {
            res.status(200).send({
                message: `${data.deletedCount} Formulaires were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all formulaires.",
            });
        });
};

