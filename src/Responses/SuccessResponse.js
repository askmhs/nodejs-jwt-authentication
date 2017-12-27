/**
 * Succes Response
 *
 * @param res
 * @param message
 * @param data
 */
export default (res, message, data) => {
    res.status(200);
    res.json({
        success: true,
        error_code: null,
        message: message,
        data: data
    });
};