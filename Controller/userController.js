const User = require("../Model/User");

exports.getUsers = (req, res, next) => {
    res.status(200).json(User.fetchAll());
}

exports.login = (req, res, next) => {
    const { username, password } = req.body;
    const user = User.login(username, password);
    if (user) {
        res.status(200).json({ message: 'Login successful', token: user.getToken(), status: 200 });
    } else {
        res.status(401).json({ message: 'Invalid username or password', status: 401 });
    }
};

