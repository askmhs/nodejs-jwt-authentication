import {LoginController} from "../Controllers/Auth/LoginController";
import SuccessResponse from "../Responses/SuccessResponse";
import {UnauthorizedException} from "../Exceptions/UnauthorizedException";
import UnauthorizedResponse from "../Responses/UnauthorizedResponse";
import InternalServerErrorResponse from "../Responses/InternalServerErrorResponse";

import jwt from 'jsonwebtoken';

module.exports = (server) => {

    /**
     * Login route
     */
    server.post('/auth/login', async (req, res) => {
        try {
            const result = await new LoginController(req.body.username, req.body.password).login();
            SuccessResponse(res, "Successfully logged in!", result);
        } catch (exception) {
            if (exception instanceof UnauthorizedException) {
                UnauthorizedResponse(res, exception.message);
            } else {
                InternalServerErrorResponse(res, exception.message);
            }
        }
    });

    /**
     * Validate token route
     */
    server.get('/auth/validate', (req, res) => {
        try {
            /**
             * Read .env
             */
            require('dotenv').config({
                path: './../.env'
            });

            /**
             * Verify token
             */
            jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    SuccessResponse(res, "Successfully validated!", result);
                }
            });
        } catch (exception) {
            if (exception instanceof jwt.TokenExpiredError) {
                UnauthorizedResponse(res, "Token expired!");
            } else {
                InternalServerErrorResponse(res, "Invalid token!");
            }
        }
    });
};