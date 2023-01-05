const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 1024,
        },
    },
    {
        timestamps: true,
    }
);

const ZoneModel = mongoose.model("zone", zoneSchema);

module.exports = ZoneModel; 