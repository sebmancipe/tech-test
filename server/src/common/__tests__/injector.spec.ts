import { resolveFileService } from "../injector";
import { DummyService } from "../../services/__tests__/dummy.service";

describe("[injector.ts]", () => {
    test("Resolves fileService properly", () => {
        const fileService = resolveFileService();

        expect(fileService).toBeInstanceOf(DummyService);
    });
});