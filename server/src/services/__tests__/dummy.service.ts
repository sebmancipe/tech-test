import { FileService } from "..";

export class DummyService implements FileService {
    public async toText(path: string): Promise<string> {
        return Promise.resolve('a-dummy-text');
    }
};