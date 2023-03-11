const jwt = require('jsonwebtoken');
const JWT_SECRET = "atish";

const fetchUser = (req, res, next) => {
    try{
        const token = req.header("auth-token");
        if(!token){
            res.status(401).send({error : "Invalid token"});
        }
        const tokenData = jwt.verify(token, JWT_SECRET);
        req.userId = tokenData.id;
        next();
    }catch(e){
        res.status(401).send({error : "Invalid token"});
    }
}

module.exports = fetchUser;