'use strict';

const Confidence = require('confidence');
const Config = require('./config');


const criteria = {
    env: process.env.NODE_ENV
};


const manifest = {
    $meta: 'This file defines the plot device.',
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    connections: [{
        port: Config.get('/port/api'),
        labels: ['api']
    }],
    registrations: [{
        plugin: './server/api/index',
    }, {
        plugin: {
            register: 'hapi-mongo-models',
            options: {
                mongodb: {
                    uri: 'mongodb://localhost:27017/test',
                    options: {},
                },
                autoIndex: false,
                models: {
                    Products: './server/api/stock/products',
                    Users: './server/api/auth/users'
                }
            }
        }
    }]
};


const store = new Confidence.Store(manifest);


exports.get = function (key) {
    
    return store.get(key, criteria);
};


exports.meta = function (key) {
    
    return store.meta(key, criteria);
};
