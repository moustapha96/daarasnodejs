const mongoose = require('mongoose');

const regionSchemae = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        departement: {
            type: [String]
        }
    },
    {
        timestamps: true,
    }
);

const RegionModel = mongoose.model("region", regionSchemae);

module.exports = RegionModel; 