const registerService = require('../services/register.service');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const verifiedToken = await registerService.createUser({ name, email, password });

    return res.status(201).json(verifiedToken);
};

module.exports = registerUser;
