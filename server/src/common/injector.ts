import { FileService } from "../services";
import { PdfService } from "../services/pdf.service";

export function resolveFileService(): FileService {
    return new PdfService();
}