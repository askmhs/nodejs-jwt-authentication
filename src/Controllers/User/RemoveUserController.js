import UserModel from './../../Models/User.model';
import {NotFoundException} from "../../Exceptions/NotFoundException";

export class RemoveUserController {

    /**
     * RemoveUserController constructor
     *
     * @param userId
     */
    constructor(userId) {
        this._userId = userId;
    }

    /**
     * Remove user
     *
     * @returns {Promise}
     */
    async remove() {
        return UserModel.findByIdAndRemove(this._userId).then((removed) => {
            if (removed !== null) {
                return removed;
            } else {
                throw new NotFoundException("Couldn't find any user data!");
            }
        }).catch((errRemoved) => {
            throw errRemoved;
        });
    }
}