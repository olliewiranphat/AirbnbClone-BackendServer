module.exports = (err, req, res, next) => {
    console.log('err', err);
    res.status(err.statusCode || 500).json({ status: "FAIL :(", error: err.message || "Something wrong!" })
}