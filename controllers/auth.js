import jwt from 'jsonwebtoken'
import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";

export const register = async (req, res) => {
    try {
        // validation
        const { name, email, password } = req.body;
        if (!name) {
            return res.status(400).send("Name is required")
        }
        if (!password || password.length < 6) {
            return res.status(400).send("Password criteria not matched")
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).send("User already exists")
        }
        // hash password
        const hashedPassword = await hashPassword(password);

        try {
            const user = await new User({
                name,
                email,
                password: hashedPassword
            }).save();


            //create signed token
            const token = jwt.sign(
                { _id: user._id },
                process.env.JWTSECRET,
                { expiresIn: "7d" }
            )

            //   console.log(user);
            const { password, ...rest } = user._doc;
            //console.log(password)
            //console.log(rest)
            return res.json({
                token,
                user: rest,
                message: 'Account registration success'
            });
        } catch (err) {
            return res.status(400).send("Authentication Error")
            //console.log(err);
        }
    } catch (err) {
        //console.log(err);
        res.status(400).send("An error occured");
    }
};

export const login = async (req, res) => {
    try {
        //console.log(req.body)
        //check email
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send("User not found")
        }
        //check password
        const match = await comparePassword(req.body.password, user.password)
        if (!match) {
            return res.status(400).send("Please enter correct password")
        }
        //create signed token
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWTSECRET,
            { expiresIn: "7d" }
        )

        const { password, ...rest } = user._doc;

        res.json({
            token,
            user: rest
        })

    } catch (err) {
        console.log(err)
    }
}
