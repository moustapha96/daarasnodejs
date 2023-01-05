const DepartementModel = require("../models/departement.model");
const ObjectID = require("mongoose").Types.ObjectId;
const RegionModel = require("../models/region.model");

module.exports.new = async (req, res) => {
    const { nom } = req.body;

    if (!req.body.nom) {
        res.status(400).send({ message: "data can not be null!" });
        return;
    }

    if (!req.body.region) {
        res.status(400).send({ message: "region can not be null!" });
        return;
    }

    try {
        const departement = await DepartementModel.create({ nom });
        res.status(201).json({ departement: departement._id });
    } catch (err) {
        res.status(500).send({ err });
    }
}

module.exports.getAll = async (req, res) => {
    const departements = await DepartementModel.find();
    res.status(200).json(departements);
}

module.exports.info = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknow : " + req.params.id);

    DepartementModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown" + err);
    });
}


module.exports.delete = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await DepartementModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "succesfully deletected. " });
    } catch (error) {
        res.status(500).json({ message: error });
    }

}

// Update a Formulaire by the id in the request
module.exports.update = async (req, res) => {


    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknow : " + req.params.id);

    await DepartementModel.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
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
    if (!req.body.region) {
        res.status(400).send({ message: "region can not be empty!" });
        return;
    }
    // Create a Formulaire
    const departement = new DepartementModel({
        nom: req.body.nom,
        region: req.body.region,
        zone: req.body.zone || ''
    });

    // Save Formulaire in the database
    DepartementModel.create(departement)
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
    DepartementModel.deleteMany({})
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

module.exports.createDepartement = async (req, res) => {

    if (!ObjectID.isValid(req.body.region))
        return res.status(400).send("id region unknow : " + req.params.id);

    const departement = new DepartementModel({
        nom: req.body.nom,
        region: req.body.region,
        zone: req.body.zone || ''
    });

    try {
        const departementCreer = await departement.save();
        await RegionModel.findOneAndUpdate(
            { _id: req.body.region },
            {
                $addToSet: { departement: departementCreer._id },
            },
            { new: true },
        );
        return res.status(201).json(departementCreer);
    } catch (error) {
        return res.status(400).send({ message: error });
    }

};

module.exports.addZone = async (req, res) => {

    if (!ObjectID.isValid(req.body.zone))
        return res.status(400).send("id zone unknow : " + req.body.zone);

    await DepartementModel.findOneAndUpdate({ _id: req.params.id },
        {
            $set: { zone: req.body.zone },
        },
        { new: true })

        .then(r => {
            return res.status(201).json(r);
        })
        .catch(err => { return res.status(400).send({ message: err }); })
}