import { Response, Request } from "express";

export function applicationStatus(req: Request, res: Response): any {
    res.json({
        data: {
            serviceAvailable: true
        }
    });
}