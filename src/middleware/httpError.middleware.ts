import { Request, Response, NextFunction } from "express";
import HttpException from "../model/httpException.model";

const httpErrorHandling = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // TODO: ERROR Handling

    if (err && err.errorCode) {
        res.status(err.errorCode).json(err.message);
    } else {
        res.status(500).json(err.message);
    }
};

export default httpErrorHandling;
