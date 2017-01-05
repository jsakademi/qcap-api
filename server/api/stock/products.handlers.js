const Products = require('./products');

class ProductsHandler {
    
    static createProduct(request, reply) {
        // set part object from payload
        const product = {
            name: request.payload.name,
            code: request.payload.code,
            amount: request.payload.amount,
            unit: request.payload.unit,
            minStock: request.payload.minStock,
            maxStock: request.payload.maxStock,
            supplier: request.payload.supplier
        };
        // create part and return it
        Products.createProduct(product, (err, product) => {
            if (err) {
                return reply(err);
            }
            reply(product);
        })
    }
    
    static deleteProduct(request, reply) {
        const productId = request.params.productId;
        // delete part with given id
        Products.deleteProduct(productId, (err) => {
            if (err) {
                return reply(err);
            }
            reply();
        });
    }

    static getProduct(request, reply) {
        const productId = request.params.productId;
        // delete part with given id
        console.log("productId " + productId);
        Products.findProductById(productId, (err,product) => {
            if (err) {
                return reply(err);
            }
            reply(product);
        });
    }

    static getProducts(request, reply) {
        // get and return parts from db
        Products.getProducts((err, products) => {
            if (err) {
                return reply(err);
            }
            reply(products);
        });
    }
    
    static updateProduct(request, reply) {
        const productId = request.params.productId;
        // set part object from payload
        const product = {
            $set: {
                name: request.payload.name,
                code: request.payload.code,
                amount: request.payload.amount,
                unit: request.payload.unit,
                minStock: request.payload.minStock,
                maxStock: request.payload.maxStock,
                supplier: request.payload.supplier
            }
        };
        // update part and return it
        Products.updateProduct(productId, product, (err, product) => {
            if (err) {
                return reply(err);
            }
            reply(product);
        });
    }
}

module.exports = ProductsHandler;
