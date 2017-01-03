const Joi = require('joi');
const ProductsHandler = require('./products.handlers.js');

const ProductsRoutes = [{
    method: 'GET',
    path: '/products',
    handler: ProductsHandler.getProducts,
    config: {
        cors: true,
        auth : 'jwt'
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
                amount: Joi.number(),
                unit: Joi.string(),
                minStock: Joi.number(),
                maxStock: Joi.number(),
                supplier: Joi.string(),
                type: Joi.string()
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
                amount: Joi.number(),
                unit: Joi.string(),
                minStock: Joi.number(),
                maxStock: Joi.number(),
                supplier: Joi.string(),
                type: Joi.string()
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