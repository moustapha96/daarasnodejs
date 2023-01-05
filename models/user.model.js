const mongoose = require('mongoose');
const { isEmail, isMobilePhone } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            trim: true
        },
        enabled: {
            type: Boolean,
            required: true
        },
        phone: {
            type: String,
            required: true,
            validate: [isMobilePhone],
        },
        status: {
            type: String,
            required: true,
        },
        sexe: {
            type: String,
            required: true,
            minLength: 7,
            maxLength: 9,
        },
        adresse: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        avatar: {
            type: String,
            default: "assets/img/users/user-orig.png"
        },
        roles: {
            type: [String],
            default: "ROLE_USER"
        },
        lastActivityAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true,
    }
);


// executer avant d'enregistrer dans la base de données
userSchema.pre("save", async function (next) {
    this.username = this.email;
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel; 