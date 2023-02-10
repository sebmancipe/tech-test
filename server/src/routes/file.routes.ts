import { Request, Response } from "express";
import { ExpressRouteFunc } from "../routes";
import { resolveFileService } from "./../common/injector";
import { FileService } from "../services";

export function convertToText(fileService: FileService = resolveFileService()): ExpressRouteFunc {
    return async function (req: Request, res: Response): Promise<any> {
        try {
            const text = await fileService.toText('path-to-file');

            res.json({ 
                data: text
            });
        } catch (e) {
            console.log(e);

            res.json({
                error: e,
            })
        }
    }
}