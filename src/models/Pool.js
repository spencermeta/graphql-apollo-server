const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const {ProfileSchema} = require('./Profile');

const PoolSchema = new mongoose.Schema({
    strategy: {
        type: String,
        required: true,
        minlengh: 1,
        maxlengh: 50,
    },
    strategyName: String,
    tokenMetadata: String,
    token: {
        type: String,
        required: true,
        minlengh: 1,
        maxlengh: 50,
    },
    amount: {
        type: String,
        required: true,
        minlengh: 1,
        maxlengh: 50,
    },
    metadataPointer: String,
    profile: ProfileSchema,
})

const Pool = mongoose.model('Pool', PoolSchema)

const validatePool = (Pool) => {
    return Joi.object({
        strategy: Joi.string().alphanum().min(1).max(50).required(),
        token: Joi.string().alphanum().min(1).max(50).required(),
        amount: Joi.string().alphanum().min(1).max(50).required(),
    }).validate(Pool)
}

exports.PoolSchema = PoolSchema
exports.Pool = Pool
exports.validatePool = validatePool