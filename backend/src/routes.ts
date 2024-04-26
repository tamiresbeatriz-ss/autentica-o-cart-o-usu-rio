import {Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCardController } from "./controllers/cartao/CreateCardController";
import { CardVerifyController} from "./controllers/cartao/CardVerifyController"

const router = Router();

/*router.get('/teste', (req: Request, res: Response) => {
    // throw new Error('Erro ao fazer requisição');
    return res.json({nome: 'tamires'});
})*/

//-------ROTAS PARA USER--------//
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/userinfo', isAuthenticated, new DetailUserController().handle);
router.post('/cartao', isAuthenticated, new CreateCardController().handle);
router.post('/cardVerify', isAuthenticated, new CardVerifyController().handle);

export{router};