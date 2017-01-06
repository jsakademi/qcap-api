const Joi = require('joi');
const TypesHandler = require('./types.handlers.js');

const TypesRoutes = [{
    method: 'GET',
    path: '/types',
    handler: TypesHandler.getTypes,
    config: {
        cors: true,
        auth : 'jwt'
    }
}, {
    method: 'POST',
    path: '/types',
    handler: TypesHandler.createType,
    config: {
        cors: true,
        auth: 'jwt',
        validate: {
            payload: {
                name: Joi.string().required(),
                type: Joi.string().required()
            }
        }
    }
}, {
    method: 'GET',
    path: '/types/{typeId}',
    handler: TypesHandler.getType,
    config: {
        cors: true,
        auth: 'jwt',
        validate: {
            params: {
                typeId: Joi.string().required()
            }
        }
    }
}, {
    method: 'PUT',
    path: '/types/{typeId}',
    handler: TypesHandler.updateType,
    config: {
        cors: true,
        auth: 'jwt',
        validate: {
            params: {
                typeId: Joi.string().required()
            },
            payload: {
                _id: Joi.any(),
                name: Joi.string().required(),
                type: Joi.string().required()
            }
        }
    }
}, {
    method: 'DELETE',
    path: '/types/{typeId}',
    handler: TypesHandler.deleteType,
    config: {
        cors: true,
        auth: 'jwt',
        validate: {
            params: {
                productId: Joi.string().required()
            }
        }
    }
}];

module.exports = TypesRoutes;