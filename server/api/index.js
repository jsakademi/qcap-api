const ProductsRoutes = require('./stock/products.routes');
const UsersRoutes = require('./auth/users.routes');
const hapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET_KEY = 'vnslj0xLW+wSpMrHvkXBxamLxviH1ps+yvlcy71b5PwVZaoZ985UmyAmXpFuSXtZoOGLsgxvGNylMEZW6A0k+osf769agzfkcglWCaJRrnsFJ8v4ziVri4hjjOWHHqN2R1fTg2NdwclL5CYknTApcqwIe1TDXNE93F26VqKTB/sDl7XKKl5gmRKt9mgaeXlPu6UPHCGop73a4WNrxHdSTTkPjYi+3xCwqG7ML/gwO3Yf32UmPsMayQiWxn7aRMkEnto+9vQ0BSm8lOWuz2QPAu6l9mcdY3eCfjNMamfjXanzPtigVTd5ThlXqGeFh0V3RLc4cu/Nmc5BjzVjxkA5YA=='

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
