const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");



module.exports.uploadProfil = async (req, res) => {

    const path = "./" + req.file.path;
    const fileName = req.file.destination + "" + req.body.firstName + ".jpeg";
    const fileOriginalPath = "assets/profils/" + req.body.firstName + ".jpeg";
    console.log(path);

    fs.rename(path, fileName, (err, docs) => {
        if (err) console.log(err)
        console.log(docs);
    })

    await UserModel.findByIdAndUpdate(
        req.body.userId,
        { $set: { avatar: fileOriginalPath } },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    ).then((docs) => {
        return res.status(201).send(docs);
    }).catch((err) => res.status(500).send({ message: err }));
};
