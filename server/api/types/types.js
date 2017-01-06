const Joi = require('joi');
const MongoModels = require('mongo-models');


class Types extends MongoModels {
    
    static createType(type, callback) {
        this.insertOne(type, (err, types) => {
            callback(err, types[0]);
        });
    }
    
    static deleteType(typeId, callback) {
        this.findByIdAndDelete(typeId, (err) => {
            callback(err);
        });
    }
    
    static getTypes(callback) {
        this.find((err, types) => {
            callback(err, types);
        });
    }

    static findTypeById(typeId, callback) {
        this.findById(typeId, (err,type) => {
            callback(err,type);
        });
    }
    
    static updateType(typeId, type, callback) {
        this.findByIdAndUpdate(typeId, type, (err, type) => {
            callback(err, type);
        });
    }

}

/** Mongo Models options*/
Types.collection = 'types';
Types.schema = Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().required()
});

module.exports = Types;