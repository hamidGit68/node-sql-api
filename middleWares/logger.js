/* this middleware simply show someting in window and then send date to another middleware */
const logger = (req, resp, next) => {
    resp.json({"hamid": "davodi"});
    req.timereq = Date.now();
    next();
}

module.exports = logger;