const ProductsRoutes = require('./stock/products.routes');
const UsersRoutes = require('./auth/users.routes');
const hapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET_KEY = '12345'

exports.register = function (server, options, next) {
    server.register(hapiJwt)
    server.auth.strategy('jwt', 'jwt',
        { key: JWT_SECRET_KEY,
            validateFunc: (decoded, request, callback) => callback(null, true), // This should be replaced with a more robust function
            verifyOptions: { algorithms: [ 'HS256' ] }
        })

    server.auth.default('jwt')
    server.route(ProductsRoutes);
    server.route(UsersRoutes);
    next();
};


exports.register.attributes = {
    name: 'api'
};
