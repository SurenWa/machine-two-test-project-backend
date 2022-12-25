const expressAsyncHandler = require("express-async-handler");


const jwt = require("jsonwebtoken");
const User = require("../models/user")

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;
    

    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        //console.log(token)
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWTSECRET);
                //console.log(decoded)
                //find the user by id
                const user = await User.findById(decoded?._id).select("-password");
                //console.log(user)
                //attach the user to the request object
                req.user = user;
                next();
            }
        } catch (error) {
            //console.log(error)
            throw new Error("Not authorized, login again");
        }
    } else {
        throw new Error("There is no token attached to the header");
    }
});

module.exports = authMiddleware;