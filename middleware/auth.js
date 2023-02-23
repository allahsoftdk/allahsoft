

export function restrictUser(req, res, next) {
    if (req.session.accessToken) {
        next();
    } else {
        req.session.error = "Access denied user";
        res.sendStatus(401);
    }
}


export function restrictAdmin(req, res, next) {
    if (req.session.accessToken && req.session.user.roleId == 2) {
        next();
    } else {
        req.session.error = "Access denied admin";
        res.sendStatus(401);
    }
}

