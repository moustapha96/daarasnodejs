const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const { CreateUserError } = require("../utils/errors.utils");
module.exports.create = async (req, res) => {
    console.log(req.body);

    const { firstName, lastName, adresse, sexe, phone, status, enabled, email, password } = req.body;

    try {
        const user = await UserModel.create({ firstName, lastName, adresse, sexe, phone, status, enabled, email, password });
        res.status(201).json({ user: user._id });

    } catch (err) {
        const error = CreateUserError(err);
        res.status(200).send(error);
    }
};


module.exports.getAllUsers = async (req, res) => {
    // pour ne pas envyer le passwor on met .select('-password');
    // pour retourner tout .select();
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("id unknow : " + req.params.id);

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID unknown" + err);
    }).select('-password');
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    adresse: req.body.adresse,
                    sexe: req.body.sexe,
                    phone: req.body.phone,
                    status: req.body.status,
                    enable: req.body.enable,
                    roles: req.body.roles
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        );
        return res.status(200).json({ user: req.params.id });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "succesfully deletec. " });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}


module.exports.profil = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    avatar: req.body.avatar
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        );
        return res.status(200).json({ user: req.params.id });
    } catch (err) {
        return res.status(500).json({ message: err });
    }

}