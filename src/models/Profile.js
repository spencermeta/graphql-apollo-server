const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const ProfileSchema = new mongoose.Schema({
    profileId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlengh: 1,
        maxlengh: 50,
    }
})

const Profile = mongoose.model('Profile', ProfileSchema)

const validateProfile = (Profile) => {
    return Joi.object({
        profileId: Joi.string().required(),
        name: Joi.string().alphanum().min(1).max(50).required(),
    }).validate(Profile)
}

exports.ProfileSchema = ProfileSchema
exports.Profile = Profile
exports.validateProfile = validateProfile