// const chai = require("chai").expect;
const Alert = require("./alert_module");
describe("constructor", () => {
    it("input date", () => {
        const date = new Date();
        const a = new Alert(date);
        expect(a).toBeDefined();
});
    it('input invalide data',() => {
        const date = '123';
        const a = new Alert(date);
        expect(a).toEqual({});
    })
});

describe('nextStep',() => {
    it('there arent any step', async () => {
            const a = new Alert(new Date());
            const initialise = await a.initialise();
            initialise.step = undefined;
            // console.log(initialise.step);
            const step = await a.nextStep(initialise);
            expect(step).toBe('no record');
    });
    it('there are any step',async () => {
        const a = new Alert(new Date());
        const initialise = await a.initialise();
        const step = await a.nextStep(initialise);
        expect(step).toEqual({ n: 1, nModified: 1, ok: 1 })
    });
    it('the index is on the last element',async () => {

    })

})
