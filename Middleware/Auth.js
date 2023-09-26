const User = require("../Model/User");

const middleware = (router) => {
    router.use((req, res, next) => {
        const authHeader = req.get("Authorization");
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header missing", status: 401 });
        }

        const user = User.auth(authHeader || " , ");
        if (user) {
            next();
        } else {
            res.status(401).json({ error: "Invalid token", status: 401 });
        }
    });
};

module.exports = middleware;