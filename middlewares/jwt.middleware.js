const { expressjwt } = require('express-jwt')

const isAuthenticated = expressjwt({

    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: 'payload',
    getToken: getTokenFromHeaders
})

function getTokenFromHeaders(req) {

    let token = null

    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {

        token = req.headers.authorization.split(" ")[1]
    }

    return token
}

module.exports = { isAuthenticated }