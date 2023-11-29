
const JWT = require("jsonwebtoken");
const authrequire = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        JWT.verify(token, process.env.Secret_Key, (err, decodedtoken) => {
            if (err) {
                return res.status(401).json({ message: "you are unauthorized" })
            } else {
                next();
            }
        });
    } else {
        return res.status(401).json({ message: "Token Not found" })
    }


}

module.exports = { authrequire };