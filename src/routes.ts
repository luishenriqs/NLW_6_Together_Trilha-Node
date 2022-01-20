import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from './controllers/CreateTagController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ListSentComplimentsController } from './controllers/ListSentComplimentsController';
import { ListReceivedComplimentsController } from './controllers/ListReceivedComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';
import { ensureAdmin } from './middleware/ensureAdmin';
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const listSentComplimentsController = new ListSentComplimentsController();
const listReceivedComplimentsController = new ListReceivedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/login', authenticateUserController.handle);
router.post('/users', createUserController.handle);
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);
router.get('/users/compliments/sent', ensureAuthenticated, listSentComplimentsController.handle);
router.get('/users/compliments/received', ensureAuthenticated, listReceivedComplimentsController.handle);
router.get('/tags', listTagsController.handle);
router.get('/users', listUsersController.handle);

export { router };