const responseMiddleware = (data, req, res, next) => {
   return res.status(data.status).json(data.json)
}

exports.responseMiddleware = responseMiddleware;