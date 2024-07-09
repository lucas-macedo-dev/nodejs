function response(status, message, aftrows, data = null) {
    return {
        status,
        message,
        affected_rows: aftrows,
        data,
        timestamp: new Date().getTime()
    };
}

module.exports = {
    response
};