const { required } = require("joi");
const { User, createToken } = require("../models/user.model");
const bcrypt = require("bcryptjs/dist/bcrypt");

//const {User}=require('../model/user.model')
module.exports = {
    getAllusers: async (req, res, next) => {
        if (req.user_role != "director")
            return next({ error: "you arn't forbbiden to get all user", status: 403 })

        try {
            const allusers = await User.find();


            res.json(allusers);
            //    res.json(User);
        }
        catch (error) {
            return next({ error: error.message, status: 400 })
        }
    },

    login: async (req, res, next) => {

        const { email, password } = req.body;
        try {

            const getUser = await User.findOne(email);
            // const getUser=await User.findOne({email:email});
            if (!getUser) {
                return next({ error: 'login failed', status: 401 })
            }
            const okPass = await bcrypt.compare(password, getUser.password)

            if (okPass) {
                const token = createToken(getUser);
                res.json({ user_name: getUser.name, token })
            }
            else {
                return next({ error: error.message, status: 400 })

            }
        } catch (error) {
            return next({ error: error.message, status: 400 })
        }
    },
    register: async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            const token = createToken(newUser);
            return res.status(201).json({ user_name: newUser.name, token })

        } catch (error) {
            return next({ error: error.message, status: 401 })
        }

    }

}