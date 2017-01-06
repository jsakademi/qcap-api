const Joi = require('joi');
const MongoModels = require('mongo-models');


class Products extends MongoModels {
    
    static createProduct(product, callback) {
        this.insertOne(product, (err, products) => {
            callback(err, products[0]);
        });
    }
    
    static deleteProduct(productId, callback) {
        this.findByIdAndDelete(productId, (err) => {
            callback(err);
        });
    }


    static findProductById(productId, callback) {
        this.findById(productId, (err,product) => {
            callback(err,product);
        });
    }
    
    static getProducts(callback) {
        this.find((err, products) => {
            callback(err, products);
        });
    }
    
    static updateProduct(productId, product, callback) {
        this.findByIdAndUpdate(productId, product, (err, product) => {
            callback(err, product);
        });
    }

    static findProductsByType(type, callback) {
        const filter = {
            type: type
        };
        this.find(filter, (err, products) => {
            callback(err, products);
        });
    }

}

/** Mongo Models options*/
Products.collection = 'stockproducts';
Products.schema = Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    amount: Joi.number(),
    unit: Joi.string(),
    minStock: Joi.number(),
    maxStock: Joi.number(),
    supplier: Joi.string(),
    type: Joi.string()
});

module.exports = Products;