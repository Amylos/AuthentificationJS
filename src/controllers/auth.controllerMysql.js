const bcrypt = require('bcrypt');
const User = require('../Models/user.model.Mysql');

module.exports.RegisterMYSQL = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user is in the DB
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password and insert user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });
        // Return the newly created user
        res.status(201).json({
            message: "User created successfully",
            userId: newUser.id
        });
    } catch (ex) {
        console.error("Error registering user:", ex);
        res.status(500).json({ message: "Error while registering" });
    }
};

module.exports.LoginMYSQL = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Compare email in the DB and return if same
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Compare both request and stored password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user });

    } catch (ex) {
        console.error("Failed to login:", ex);
        res.status(500).json({ message: "Error while logging" });
    }
};

