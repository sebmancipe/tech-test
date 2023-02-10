import { FileService } from "../services";

export class PdfService implements FileService {
    constructor(
        private readonly parser: any = require('pdf-to-text')
    ){
        this.parser = parser;
    }

    public async toText(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.parser.pdfToText(
                path, 
                (error: any, data: string) => resolve(data),
                (error: any) => reject(error)
            );
        });
    }
}
