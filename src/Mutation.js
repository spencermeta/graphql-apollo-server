const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const lodash = require('lodash')
const { UserInputError } = require('apollo-server')

const { Grant, validateGrant } = require('./models/Grant')
const { Pool, validatePool } = require('./models/Pool')
const { Profile, validateProfile } = require('./models/Profile')
const { Character, validateCharacter } = require('./models/Character')
const { User, validateUser } = require('./models/User')
const { sendConfirmationEmail } = require('./services/EmailService')

const Mutation = {
    addGrant(_, payload) {
        /*
        const { value, error } = validateGrant(payload, { abortEarly: false })
        if ( error ) {
            throw new UserInputError('Failed to create a grant due to validation errors', {
                validationErrros: error.details 
            }) 
        }*/
        return Grant.create(payload)
    },
    addPool(_, payload) {
        /*
        const { value, error } = validatePool(payload, { abortEarly: false })
        if ( error ) {
            throw new UserInputError('Failed to create a pool due to validation errors', {
                validationErrros: error.details 
            }) 
        }*/
        return Pool.create(payload)
    }, 
    addProfile(_, payload) {
        const { value, error } = validateProfile(payload, { abortEarly: false })
        if ( error ) {
            throw new UserInputError('Failed to create a profile due to validation errors', {
                validationErrros: error.details 
            }) 
        }
        return Profile.create(value)
    }, 
    addCharacter(_, payload) {
        const { value, error } = validateCharacter(payload, { abortEarly: false })
        if ( error ) {
            throw new UserInputError('Failed to create a character due to validation errors', {
                validationErrros: error.details 
            }) 
        }
        return Character.create(value)
    }, 
    async signup(_, {user}) {
        const { value, error } = validateUser(user)
        if (error) {
            throw new UserInputError('Failed to create a character due to validation errors', {
                validationErrros: error.details 
            })
        }

        const password = await bcrypt.hash(user.password, 10)
        const registerUser = await User.create({
            ...value,
            password
        })

        sendConfirmationEmail(registerUser)

        const token = await jwt.sign({
            _id: registerUser._id
        }, process.env.JWT_SECRET_KEY)

        return {
            token,
            user: lodash.pick(registerUser, ['id', 'name', 'email'])
        }
    },
    async confirmEmail(_, { token }) {
        try {
            const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const user = await User.findById(_id)
            user.emailVerified = true
            user.save()
            return true
        } catch (err) {
            return false
        }
    }
}

module.exports = Mutation