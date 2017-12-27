/**
 * Not Found Response
 * @param res
 * @param message
 * @param code
 */
export default (res, message, code = 0) => {
    res.status(404);
    res.json({
        success: false,
        error_code: code,
        message: message,
        data: null
    });
}