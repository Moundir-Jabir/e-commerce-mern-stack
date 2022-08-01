const expressJWT = require('express-jwt')
// verifie si token existe
exports.requireSignin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    if(req.auth.role == 1)
        return next()
    let user = req.profile && req.auth && (req.profile._id == req.auth._id)
    if(!user)
        return res.status(403).json({
            error: 'Access denied'
        })
    next()
}
// verifie si le token est admin
exports.isAdmin = (req, res, next) => {
    if(req.auth.role == 0)
        return res.status(403).json({
            error: 'Admin ressource, Access denied !'
        })
    next()
}