'use strict';

module.exports = (error, req, res, next) => {
    return res.status(res.statusCode || 500).json({
        code: res.statusCode || 500,
        route: req.path,
        message: `Server Error: ${error.message || error}`,
    });
};
