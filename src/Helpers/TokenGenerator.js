import jwt from 'jsonwebtoken';

export class TokenGenerator {

    /**
     * TokenGenerator constructor
     *
     * @param data
     */
    constructor(data) {
        this._data = data;
    }

    /**
     * Generate token
     *
     * @returns {*}
     */
    generate() {

        /**
         * Read .env file
         */
        require('dotenv').config({
            path: './../.env'
        });

        return jwt.sign(this._data, process.env.JWT_SECRET, {
            expiresIn: 200 // It means token expired in 200 seconds
        });
    }
}