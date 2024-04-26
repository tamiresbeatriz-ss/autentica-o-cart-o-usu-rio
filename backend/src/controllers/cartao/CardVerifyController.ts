import { Request, Response } from "express";
import { CardVerifyService } from "../../services/cartao/CardVerifyService";

declare module "express-serve-static-core" {
    interface Request {
        user_id: string;
    }
}

class CardVerifyController {
    async handle(req: Request, res: Response) {
        try {
            const { numero } = req.body;
            const id_Usersession = req.user_id;

            const cardVerifyService = new CardVerifyService();

            const cardVerify = await cardVerifyService.execute({ numero, id_Usersession });

            return res.json(cardVerify);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export { CardVerifyController };
