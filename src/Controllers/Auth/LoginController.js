import UserModel from './../../Models/User.model';
import {UnauthorizedException} from "../../Exceptions/UnauthorizedException";
import {TokenGenerator} from "../../Helpers/TokenGenerator";

export class LoginController {

    /**
     * LoginController constructor
     *
     * @param username
     * @param password
     */
    constructor(username, password) {
        this._username = username;
        this._password = password;
    }

    /**
     * Login
     *
     * @returns {Promise}
     */
    async login() {
        return UserModel.findOne({
            username: this._username,
            password: this._password
        }).select('_id + name + phone + username').lean().then((user) => {
            if (user !== null) {
                /**
                 * Generate Token
                 *
                 * @type {*}
                 */
                const token = new TokenGenerator(user).generate();

                return {
                    token: token
                };
            } else {
                throw new UnauthorizedException("Invalid username or password!");
            }
        }).catch((errUser) => {
            throw errUser;
        });
    }
}