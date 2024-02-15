"use strict"

const StatusCode = {
    FORBIDDEN: 403, 
    CONFLICT: 409
}

const ResponseStatusCode = {
    FORBIDDEN: "Bad request error",
    CONFLICT: "Conflict error "
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ResponseStatusCode.FORBIDDEN, statusCode= ResponseStatusCode.CONFLICT) {
        super(message, statusCode)

    } 
}

class BadRequestError extends ErrorResponse {
    constructor(message = ResponseStatusCode.FORBIDDEN, statusCode= ResponseStatusCode.CONFLICT) {
        super(message, statusCode)

    } 
}

module.exports = {
    ConflictRequestError,
    BadRequestError
}