const Joi = require('joi');
const ProductsHandler = require('./products.handlers.js');

const ProductsRoutes = [{
    method: 'GET',
    path: '/products',
    handler: ProductsHandler.getProducts,
    config: {
        cors: true,
        auth : false
    }
}, {
    method: 'POST',
    path: '/products',
    handler: ProductsHandler.createProduct,
    config: {
        cors: true,
        auth: 'jwt',
        validate: {
            payload: {
                name: Joi.string().required(),
                code: Joi.string().required(),
                amount: Joi.number().allow(null),
                unit: Joi.string().allow(null),
                minStock: Joi.number().allow(null),
                maxStock: Joi.number().allow(null),
                supplier: Joi.string().allow(null),
                type: Joi.string().required()
            }
        }
    }
}, {
    method: 'GET',
    path: '/products/{productId}',
    handler: ProductsHandler.getProduct,
    config: {
        cors: true,
        auth: 'jwt',
        validate: {
            params: {
                productId: Joi.string().required()
            }
        }
    }
}, {
    method: 'PUT',
    path: '/products/{productId}',
    handler: ProductsHandler.updateProduct,
    config: {
        cors: true,
        auth: 'jwt',
        validate: {
            params: {
                productId: Joi.string().required()
            },
            payload: {
                _id: Joi.any(),
                name: Joi.string().required(),
                code: Joi.string().required(),
                amount: Joi.number().allow(null),
                unit: Joi.string().allow(null),
                minStock: Joi.number().allow(null),
                maxStock: Joi.number().allow(null),
                supplier: Joi.string().allow(null),
                type: Joi.string().required()
            }
        }
    }
}, {
    method: 'DELETE',
    path: '/products/{productId}',
    handler: ProductsHandler.deleteProduct,
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

module.exports = ProductsRoutes;