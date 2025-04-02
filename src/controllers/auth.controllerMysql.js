const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user.model.Mysql');
require('dotenv').config();

module.exports.Register = async (req, res) => {
    const { email, password, role } = req.body;
    console.log(role);
    try {
        // Check if the user is in the DB
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password and insert user
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT) );
        const newUser = await User.create({ email : email,password :  hashedPassword, role : role });
        // Return the newly created user
        res.status(201).json({ message: "User created successfully", user: {id : newUser.id, email : newUser.email, role : newUser.role }});
    } catch (ex) {
        console.error("Error registering user:", ex);
        res.status(500).json({ message: "Error while registering" });
    }
};

module.exports.Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Compare email & return if same
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Compare both request and stored password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Create the token using secret key and return it
        const token = jwt.sign({ email : email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
        });

        res.cookie('token',token, {httpOnly:true});
        res.status(200).json({ message: "Login successful", user : {email : user.email, role : user.role }, token, });

    } catch (ex) {
        console.error("Failed to login:", ex);
        res.status(500).json({ message: "Error while logging" });
    }
};

module.exports.Logout = async (req,res) =>{
    try{
        // remove cookies
        res.status(200).json({ message: "Logout successful"});

    }catch(ex){
        res.status(500).json({ message: "Error while logging out"});
    }
}
