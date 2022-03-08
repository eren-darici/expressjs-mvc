const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerPost = async (req, res) => {
    try {
        // Get user input
        const {first_name, last_name, email, password} = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All inputs are required");
        }

        // Check if user already exists
        const oldUser = await User.findOne({email});

        if (oldUser) {
            return res.status(409).send("User already exists. Please login.");
        }

        // Encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        });

        // Create and sign JWT
        const token = jwt.sign(
            {user_id: user.id, email},
            process.env.JWT_KEY,
            {
                expiresIn: "2h"
            }
        );

        // Save token
        user.token = token;

        // Return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err)
    }
}

const loginPost = async (req, res) => {
    try {
        // Get user input
        const {email, password} = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All inputs are required");
        }

        // Validate if user exists in database
        const user = await User.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user.id, email},
                process.env.JWT_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // Save user token
            user.token = token;

            // User
            res.status(200).send(user);
        }
        else {
            res.status(400);
            res.send("Invalid credentials");
        }

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    registerPost,
    loginPost
}