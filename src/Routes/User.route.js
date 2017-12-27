import {CreateUserController} from "../Controllers/User/CreateUserController";
import SuccessResponse from "../Responses/SuccessResponse";
import InternalServerErrorResponse from "../Responses/InternalServerErrorResponse";
import {UpdateUserController} from "../Controllers/User/UpdateUserController";
import {NotFoundException} from "../Exceptions/NotFoundException";
import NotFoundResponse from "../Responses/NotFoundResponse";
import {RemoveUserController} from "../Controllers/User/RemoveUserController";
import {GetUserController} from "../Controllers/User/GetUserController";

module.exports = (server) => {

    /**
     * Create new user route
     */
    server.post('/user/create', async (req, res) => {
        try {
            const result = await new CreateUserController(req.body).store();
            SuccessResponse(res, "Successfully create new user!", result);
        } catch (exception) {
            InternalServerErrorResponse(res, exception.message);
        }
    });

    /**
     * Update user route
     */
    server.post('/user/update/:userId', async (req, res) => {
        try {
            const result = await new UpdateUserController(req.params.userId, req.body).update();
            SuccessResponse(res, "Successfully update user data!", result);
        } catch (exception) {
            if (exception instanceof NotFoundException) {
                NotFoundResponse(res, exception.message);
            } else {
                InternalServerErrorResponse(res, exception.message);
            }
        }
    });

    /**
     * Remove user route
     */
    server.post('/user/remove', async (req, res) => {
        try {
            const result = await new RemoveUserController(req.body.userId).remove();
            SuccessResponse(res, "Successfully remove user!", null);
        } catch (exception) {
            if (exception instanceof NotFoundException) {
                NotFoundResponse(res, exception.message);
            } else {
                InternalServerErrorResponse(res, exception.message);
            }
        }
    });

    /**
     * Get all user route
     */
    server.get('/user/list', async (req, res) => {
        try {
            const result = await new GetUserController().all();
            SuccessResponse(res, "Successfully get all users!", result);
        } catch (exception) {
            InternalServerErrorResponse(res, exception.message);
        }
    });

    /**
     * get detail user route
     */
    server.get('/user/detail/:userId', async (req, res) => {
        try {
            const result = await new GetUserController().detail(req.params.userId);
            SuccessResponse(res, "Successfully get detail user!", result);
        } catch (exception) {
            if (exception instanceof NotFoundException) {
                NotFoundResponse(res, exception.message);
            } else {
                InternalServerErrorResponse(res, exception.message);
            }
        }
    });
};