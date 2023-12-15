const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const {PoolSchema} = require('./Pool');

const schema = new mongoose.Schema({
    poolId: {
        type: String,
        required: true,
        minlengh: 1,
        maxlengh: 50,
    },
    chainId: String,
    strategy: String,
    allocationStartTime: String,
    allocationEndTime: String,
    approvalThreshold: String,
    maxRequestedAmount: String,
    blockTimestamp: String,
    pool: PoolSchema,
})

const Grant = mongoose.model('Grant', schema)

const validateGrant = (Grant) => {
    return Grant;
}

exports.Grant = Grant
exports.validateGrant = validateGrant