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
                content: Joi.string().required(),
                type: Joi.string().required()
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