'use strict'

const {findById} = require("../services/apiKey.service")
const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION : 'authorization'
}
const apiKey= async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if(!key) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        const objKey = await findById(key)
        if(!objKey) {
            return res.status(403).json({
                message: 'Forbidden1 Error '
            })
        }
        req.objKey = objKey
        next()
    }catch (error) {
        return error
    }
}
const checkPermission = (permission) => {
    return (req, res, next) => {

        if(!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Forbidden Error '
            })
        }
        const validPermission = req.objKey.permissions.includes(permission)
        if(!validPermission) {
            return res.status(403).json({
                message: 'Forbidden2 Error '
            })
        }
        return next()

    }
}

const asyncHandler = fn => {
    return(req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

module.exports = {
    apiKey,
    checkPermission,
    asyncHandler
}