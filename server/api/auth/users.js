const Joi = require('joi');
const MongoModels = require('mongo-models');


class Users extends MongoModels {
    
    static createUser(user, callback) {
        this.insertOne(user, (err, users) => {
            callback(err, users[0]);
        });
    }
    
    static deleteUser(userId, callback) {
        this.findByIdAndDelete(userId, (err) => {
            callback(err);
        });
    }
    
    static getUsers(callback) {
        this.find((err, users) => {
            callback(err, users);
        });
    }
    
    static updateUser(userId, user, callback) {
        this.findByIdAndUpdate(userId, user, (err, user) => {
            callback(err, user);
        });
    }

    static getUser(user, callback) {
        this.findOne(user, (err, user) => {
            callback(err, user);
        });
    }

}

/** Mongo Models options*/
Users.collection = 'users';
Users.schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.number(),
    company: Joi.string()
});

module.exports = Users;