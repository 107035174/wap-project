
class User {

    constructor(username, password, cart) {
        this.username = username;
        this.password = password;
        this.cart = cart;
    }

    static addUser(username, password) {
        const newUser = new Users(username, password);
        users.push(newUser);
    }

    static fetchAll() {
        return users;
    }

    static login(username, password) {
        const user = users.find(user => user.username === username && user.password === password);
        return user;
    }

    getToken() {
        return this.username + "," + Date.now();
    }
    static auth(token) {
        const tokenArray = token.split(",");

        const user = users.find(user => user.username === tokenArray[0]);
        return user;
    }
}

const users = [new User('1', '123'), new User('2', '123')];

module.exports = User;