const UserModel = require("../models/user.model");
const { SignUpErrors, LoginError } = require("../utils/errors.utils");

const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}
module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, adresse, sexe, phone, status, enabled, email, password } = req.body;
    try {
        const user = await UserModel.create({ firstName, lastName, adresse, sexe, phone, status, enabled, email, password });
        res.status(201).json({ user: user._id });

    } catch (err) {
        const errors = SignUpErrors(err);
        res.status(200).send({ errors });
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
        res.status(200).json({ user: user._id, token: token, currentUser: user });
    } catch (err) {
        const errors = LoginError(err);
        res.status(500).send({ errors });
    }
};

module.exports.logOut = async (req, res) => {
    res.cookie("jwt", '', { maxAge: 1 });
    res.redirect('/');
};

