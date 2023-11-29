const mongoose = require("mongoose")
const User = require("../model");
require('dotenv').config()
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt")


const Create_Token = (id) => {
    return JWT.sign({ id }, process.env.Secret_Key)
}



//Registration 
const registration = async (req, res) => {
    const { UserName, passwordassword, Text } = req.body;
    try {
        const exist = await User.findOne({ Name: req.body.UserName });
        if (exist) {
            return res.status(400).json({ message: "User already exist" });
        }

        const hashpassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            Name: req.body.UserName,
            password: hashpassword,
            Text: req.body.Text
        });
        await user.save();
        return res.status(200).json({ message: "data is stored" });
    }
    catch (error) {

        return res.status(500).json(error)
    }
}


//Update text 
const updateText = async (req, res) => {
    const { newText, Name } = req.body;
    try {
        const exist = await User.findOne({ Name });
        if (!exist) {
            return res.status(401).json("User not found");
        }
        const update = await User.findOneAndUpdate({ Name }, { Text: newText });
        return res.status(200).json({ message: "Text has been updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}


//All Data
const totalUserData = async (req, res) => {
    try {
        const all_data = await User.find().select('-password');
        return res.status(200).json(all_data);
    } catch (error) {
        return res.status(400).json(error);
    }
}


//User Login
const login = async (req, res) => {
    const { Name, password } = req.body;

    try {
        const user = await User.findOne({ Name });

        if (!user) {
            return res.status(400).json({ message: "User is invalid" });
        }

        if (bcrypt.compareSync(password, user.password)) {
            let Token = Create_Token(user._id);
            res.cookie("Cookie", Token, { httpOnly: true, maxAge: 99999991000009 });
            return res.status(200).json({
                "status": "success",
                "message": "Login successful",
                "data": {
                    "userId": user._id,
                    "username": user.Name,
                    "Text": user.Text
                }
            });
        }


        return res.status(400).json({ message: "Password is incorrect" });


    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { registration, updateText, totalUserData, login };