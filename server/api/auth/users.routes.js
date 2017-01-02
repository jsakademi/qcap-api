const Joi = require('joi');
const UsersHandler = require('./users.handlers.js');

const UsersRoutes = [{
    method: 'GET',
    path: '/users',
    handler: UsersHandler.getUsers,
    config: {
        cors: true,
        auth : 'jwt'
    }
}, {
    method: 'POST',
    path: '/users',
    handler: UsersHandler.createUser,
    config: {
        cors: true,
        auth: 'jwt',
        validate: {
            payload: {
                username: Joi.string().required(),
                password: Joi.string().required(),
                role: Joi.number(),
                company: Joi.string()
            }
        }
    }
}, {
    method: 'PUT',
    path: '/users/{userId}',
    handler: UsersHandler.updateUser,
    config: {
        cors: true,
        auth: 'jwt',
        validate: {
            params: {
                partId: Joi.string().required()
            },
            payload: {
                _id: Joi.any(),
                content: Joi.string().required(),
                type: Joi.string().required()
            }
        }
    }
}, {
    method: 'DELETE',
    path: '/users/{userId}',
    handler: UsersHandler.deleteUser,
    config: {
        cors: true,
        auth: 'jwt',
        validate: {
            params: {
                userId: Joi.string().required()
            }
        }
    }
}, {
    method: 'POST',
    path: '/login',
    handler: UsersHandler.getUser,
    config: {
        cors: true,
        auth: false,
        validate: {
            payload: {
                username: Joi.string().required(),
                password: Joi.string().required()
            }
        }
    }
}];

module.exports = UsersRoutes;