exports.errorFunc = (err, res, req, next) => {
    return res.status(err.status || 500).json({ error: err.massage || "server error" })

}


exports.wrongPage = (res, req, next) => {
    res.status(404).json("page not found");

}



