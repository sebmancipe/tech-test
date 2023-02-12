import { FileService } from "../services";
import { PdfService } from "../services/pdf.service";
import { DummyService } from "../services/__tests__/dummy.service";
import { isTesting } from "../utils/environment";

export function resolveFileService(): FileService {
    if (isTesting()){
        return new DummyService();
    }

    return new PdfService();
}