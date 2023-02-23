
export default function restrict(req, res, next) {
    if (req.session.accessToken) {
        next();
    } else {
        req.session.error = "Access denied!";
        res.sendStatus(401);
    }
}

