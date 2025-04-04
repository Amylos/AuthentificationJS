const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user.model');
require('dotenv').config();

module.exports.DeleteUser = async(req,res) =>{
    const id = req.body.userId;
    try{
        const user = await User.DeleteOne({ where: { id } });
        console.log(user);
    }catch(ex){

    }
}