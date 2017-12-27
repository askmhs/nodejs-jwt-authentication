import UserModel from './../../Models/User.model';
import {NotFoundException} from "../../Exceptions/NotFoundException";

export class UpdateUserController {

    /**
     * UpdateUserController constructor
     *
     * @param userId
     * @param data
     */
    constructor(userId, data) {
        this._userId = userId;
        this._data = data;
    }

    /**
     * Update user data
     *
     * @returns {Promise}
     */
    async update() {
        return UserModel.findByIdAndUpdate(this._userId, {
            $set: this._data
        }, {
            new: true   // This will return updated data
        }).then((updated) => {
            if (updated !== null) {
                return updated;
            } else {
                throw new NotFoundException("Coldn't find any user data!");
            }
        }).catch((errUpdated) => {
            throw errUpdated;
        });
    }
}