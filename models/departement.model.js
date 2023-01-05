const mongoose = require('mongoose');

const departementSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        region: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            trim: true
        },
        zone: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

const DepartementModel = mongoose.model("departement", departementSchema);

module.exports = DepartementModel; 