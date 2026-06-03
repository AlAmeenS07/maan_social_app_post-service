import { Request, Response, NextFunction } from "express";
import { logger } from "../../config/logger";
import { messages } from "../constants/messages";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {

    const start = Date.now();

    res.on("finish", () => {

        logger.info(messages.REQUEST_COMPLETED, {
            requestId: req.headers["x-request-id"],
            userId: req.headers["x-user-id"] || null,
            method: req.method,
            route: req.originalUrl,
            statusCode: res.statusCode,
            duration: Date.now() - start,
            service : messages.POST_SERVICE
        });

    });

    next();
};