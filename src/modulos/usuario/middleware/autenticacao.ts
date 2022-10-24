import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

function autenticar(req: Request, res: Response, next: NextFunction) {

    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ status: "NÃO AUTORIZADO" })
    }

    token = token.replace("Bearer ", "")

    try {
        verify(token, String(process.env.JWT_SEGREDO))
    } catch (err) {
        return res.status(401).json({ status: "NÃO AUTORIZADO" })
    }

    next()
}

export { autenticar }