/**
 * Unauthorized response
 *
 * @param res
 * @param message
 * @param code
 */
export default (res, message, code = 4) => {
    res.status(401);
    res.json({
        success: false,
        error_code: code,
        message: message,
        data: null
    });
}