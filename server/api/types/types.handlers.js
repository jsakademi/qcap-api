const Types = require('./types');

class TypesHandler {
    
    static createType(request, reply) {
        // set part object from payload
        const type = {
            name: request.payload.name,
            type: request.payload.type
        };
        // create part and return it
        Types.createType(type, (err, type) => {
            if (err) {
                return reply(err);
            }
            reply(type);
        })
    }
    
    static deleteType(request, reply) {
        const typeId = request.params.typeId;
        // delete part with given id
        Types.deleteType(typeId, (err) => {
            if (err) {
                return reply(err);
            }
            reply();
        });
    }

    static getType(request, reply) {
        const typeId = request.params.typeId;
        // delete part with given id
        Types.findTypeById(typeId, (err,type) => {
            if (err) {
                return reply(err);
            }
            reply(type);
        });
    }

    static getTypes(request, reply) {
        // get and return parts from db
        Types.getTypes((err, types) => {
            if (err) {
                return reply(err);
            }
            reply(types);
        });
    }
    
    static updateType(request, reply) {
        const typeId = request.params.typeId;
        // set part object from payload
        const type = {
            $set: {
                name: request.payload.name,
                type: request.payload.type
            }
        };
        // update part and return it
        Types.updateType(typeId, type, (err, type) => {
            if (err) {
                return reply(err);
            }
            reply(type);
        });
    }
}

module.exports = TypesHandler;
