const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql'); // ✅ Importer sequelize

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
    tableName: 'users',
});

module.exports = User;










// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6
//     },
//     role: {
//         type: String,
//         required: true,
//     }
// });

// const User = mongoose.model("UserSchema", UserSchema);

// module.exports = User;



// // Controller 


// const bcrypt = require('bcrypt');
// const User = require('../Models/user.modelMongo');

// module.exports.RegisterMONGO = async (req,res) =>{
//     const {email, password} = req.body;
//     try{
//         const user = await User.findOne({email});
//         if(user){
//             console.error('User already in the DB : ', user);
//             return res.status(400).json({message : 'User already in the DB'});
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await User.create({email : email, password : hashedPassword});
//         if(!newUser){
//             console.error('Failed to create a new user: ');
//             return res.status(400).json({message : 'Failed to create a new user'});
//         }
//         console.log('User created successfully');
//         return res.status(200).json({user : newUser});
//     }
//     catch(ex){
//         res.status(500).json({message : 'Error while regsitering user'});
//     }
// }

// module.exports.LoginMONGO = async (req,res) =>{
//     const {email,password} = req.body;

//     try{
//         const user = await User.findOne({email});
//         const isMatch = await bcrypt.compare(password, user.password);

//         if(!user || !isMatch){
//             console.log('Invalid credentials');
//             return res.status(400).json({message : 'Invalid credentials'});
//         }
//         res.status(200).json({ message: "Login successful", user });

//     }
//     catch(ex){
//         res.status(500).json({message : 'Error while logging'});

//     }
// }



// Mongo DB
// const {RegisterMONGO, LoginMONGO} = require('../controllers/auth.controllerMongo');
// router.post('/RegisterMONGO',RegisterMONGO);
// router.post('/loginMONGO',LoginMONGO);
