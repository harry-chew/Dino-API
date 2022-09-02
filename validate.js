module.exports = function validateAuthToken(req, res, next) {
    const { authorization } = req.headers;
    if(authorization && authorization === '123') {
        next();
    }
    else {
        res.status(403).send({ msg : "Forbidden. Incorrect Credentials."});
    }
}