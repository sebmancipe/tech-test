import { DummyService } from "./dummy.service";

describe("[dummy.service]", () => {
    it('toText returns fixed string on testing', async () => {
        const dummyService = new DummyService();

        expect(await dummyService.toText('any-path')).toEqual('a-dummy-text');
    });
});