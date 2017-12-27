import UserModel from '../../Models/User.model';

export class CreateUserController {

    /**
     * CreateUserController constructor
     *
     * @param data
     */
    constructor(data) {
        this._data = data;
    }

    /**
     * Store data to DB
     *
     * @returns {Promise<T>}
     */
    async store() {
        return UserModel.create(this._data).then((created) => {
            return created;
        }).catch((errCreated) => {
            throw errCreated;
        });
    }
}