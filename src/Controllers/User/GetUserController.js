import UserModel from './../../Models/User.model';
import {NotFoundException} from "../../Exceptions/NotFoundException";

export class GetUserController {

    /**
     * Get all users
     *
     * @returns {Promise}
     */
    async all() {
        return UserModel.find().lean().then((users) => {
            return users;
        }).catch((errUsers) => {
            throw errUsers;
        });
    }

    /**
     * Get user detail by user ID
     *
     * @param userId
     * @returns {Promise}
     */
    async detail(userId) {
        return UserModel.findById(userId).lean().then((user) => {
            if (user !== null) {
                return user;
            } else {
                throw new NotFoundException("Couldn't find any user data!");
            }
        }).catch((errUser) => {
            throw errUser;
        });
    }
}