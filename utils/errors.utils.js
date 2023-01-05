module.exports.SignUpErrors = (err) => {
    let errors = { email: '', prenom: '', nom: '', phone: '' }

    if (err.message.includes('email'))
        errors.email = "Email incorrect ou deja pris";

    if (err.message.includes('phone'))
        errors.email = "phone incorrect ou deja pris";

    if (err.message.includes('prenom'))
        errors.email = "prenom incorrect ";

    if (err.message.includes('nom'))
        errors.email = "Nom incorrect ou deja pris";

    if (err.code === 11000)
        errors.email = "cette email existe deja !"

    return errors;
};


module.exports.LoginError = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes('email'))
        errors.email = "Email inconnue";

    if (err.message.includes('password'))
        errors.email = "le mot de passe ne correspond pas";

    return errors;

};

module.exports.CreateUserError = (err) => {

    let errors = { email: '' }

    if (err.message.includes('email'))
        errors.email = "Email inconnue ou deja prise ";

    return errors;
}