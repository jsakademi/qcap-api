const Users = require('./users');
const JWT = require('jsonwebtoken');
const secret = 'vnslj0xLW+wSpMrHvkXBxamLxviH1ps+yvlcy71b5PwVZaoZ985UmyAmXpFuSXtZoOGLsgxvGNylMEZW6A0k+osf769agzfkcglWCaJRrnsFJ8v4ziVri4hjjOWHHqN2R1fTg2NdwclL5CYknTApcqwIe1TDXNE93F26VqKTB/sDl7XKKl5gmRKt9mgaeXlPu6UPHCGop73a4WNrxHdSTTkPjYi+3xCwqG7ML/gwO3Yf32UmPsMayQiWxn7aRMkEnto+9vQ0BSm8lOWuz2QPAu6l9mcdY3eCfjNMamfjXanzPtigVTd5ThlXqGeFh0V3RLc4cu/Nmc5BjzVjxkA5YA==';

const cookie_options = {
    ttl:  15 * 60 * 1000, // expires 15 min from today
    encoding: 'none',    // we already used JWT to encode
    isSecure: true,      // warm & fuzzy felings
    isHttpOnly: true,    // prevent client alteration
    clearInvalid: false, // remove invalid cookies
    strictHeader: true   // don't allow violations of RFC 6265
}

class UsersHandler {

    static createUser(request, reply) {
        // set part object from payload
        const user = {
            username: request.payload.username,
            password: request.payload.password,
            role: request.payload.role,
            company: request.payload.company
        };
        // create part and return it
        Users.createUser(user, (err, user) => {
            if (err) {
                return reply(err);
            }
            reply(user);
        })
    }
    
    static deleteUser(request, reply) {
        const userId = request.params.userId;
        // delete part with given id
        Users.deleteUser(userId, (err) => {
            if (err) {
                return reply(err);
            }
            reply();
        });
    }
    
    static getUsers(request, reply) {
        // get and return parts from db
        Users.getUsers((err, users) => {
            if (err) {
                return reply(err);
            }
            reply(users);
        });
    }
    
    static updateUser(request, reply) {
        const userId = request.params.userId;
        // set part object from payload
        const product = {
            $set: {
                username: request.payload.username,
                password: request.payload.password,
                role: request.payload.role,
                company: request.payload.company
            }
        };
        // update part and return it
        Users.updateUser(userId, user, (err, user) => {
            if (err) {
                return reply(err);
            }
            reply(user);
        });
    }

    static getUser(request, reply) {
        // set part object from payload
        const user = {
            username: request.payload.username,
            password: request.payload.password
        };
        // create part and return it
        Users.getUser(user, (err, user) => {
            if (err) {
                return reply(err);
            }
            if(user) {
                let token = JWT.sign(user, secret);
                user.token = token;
                reply(user)
                    .header("Authorization", token)
                    .state("token", token, cookie_options);       // where token is the JWT;
            }

        })
    }
}

module.exports = UsersHandler;
