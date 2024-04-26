import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string;
}

declare module "express-serve-static-core" {
    interface Request {
        user_id: string;
    }
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    //armazena o token do usuário
    const authToken = req.headers.authorization;

    //verifica se o usuário envio o token
    if (!authToken) {
        return res.status(401).end();
    }
    console.log("authToken");

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET!
        ) as PayLoad;
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}

