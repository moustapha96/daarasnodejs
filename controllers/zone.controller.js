const ZoneModel = require("../models/zone.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.new = async (req, res) => {
    const { nom, description, status } = req.body;

    if (!req.body.nom || !req.body.description || !req.body.status ) {
        res.status(400).send({ message: "data can not be null!" });
        return;
    }
    try {
        const zone = await ZoneModel.create({ nom, description, status });
        res.status(201).json({ zone: zone._id });
    } catch (err) {
        res.status(500).send({ err });
    }
}

module.exports.getAll = async (req, res) => {
    // pour ne pas envyer le passwor on met .select('-password');
    // pour retourner tout .select();
    const zones = await ZoneModel.find();
    res.status(200).json(zones);
}

module.exports.info = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknow : " + req.params.id);

    ZoneModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown" + err);
    });
}


module.exports.delete = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await ZoneModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "succesfully deletected. " });
    } catch (error) {
        res.status(500).json({ message: error });
    }

}

// Update a Formulaire by the id in the request
module.exports.update = async (req, res) => {


    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknow : " + req.params.id);

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }
    if (!req.body.nom) {
        res.status(400).send({ message: "title can not be empty!" });
        return;
    }
    if (!req.body.description) {
        res.status(400).send({ message: "description can not be empty!" });
        return;
    }
    if (!req.body.status) {
        res.status(400).send({ message: "fields can not be empty!" });
        return;
    }
   

    await ZoneModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
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
    if (!req.body.description) {
        res.status(400).send({ message: "description can not be empty!" });
        return;
    }
    
    if (!req.body.status) {
        res.status(400).send({ message: "status can not be empty!" });
        return;
    }
    // Create a Formulaire
    const zone = new ZoneModel({
        nom: req.body.nom,
        status: req.body.status,
        description: req.body.description,
    });

    // Save Formulaire in the database
    ZoneModel.create(zone)
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
    ZoneModel.deleteMany({})
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

