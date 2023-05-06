const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
    try {
        const token = req.header("auth-token");
        if (!token) {
            throw new Error("Unauthorized Access Please Login to continue");
        }
        const tokenData = jwt.verify(token, JWT_SECRET);
        req.userId = tokenData.id;
        next();
    } catch (e) {
        res.status(401).send({status:false,msg: e.message});
    }
}

module.exports = fetchUser;