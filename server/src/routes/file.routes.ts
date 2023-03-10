import { Request, Response } from "express";
import { ExpressRouteFunc } from "../routes";
import { resolveFileService } from "./../common/injector";
import { FileService } from "../services";
import { unlinkSync } from "fs";
import { isTesting } from "../utils/environment";

export function convertToText(fileService: FileService = resolveFileService()): ExpressRouteFunc {
    return async function (req: Request, res: Response): Promise<any> {
        res.set('Access-Control-Allow-Origin', isTesting() ? 'http://localhost:3000' : 'https://latii-web.onrender.com');

        if(req.file){
            try {
                const text = await fileService.toText(req.file.path);

                unlinkSync(req.file.path);
    
                res.json({data: text});
            } catch (e) {
                res.json({error: e});
            }
        } else {
            res.json({
                data: "Not a valid file provided"
            })
        }
    }
}