const Alert = require("./alert_module");
const assert = require("assert");
// describe("constructor", () => {
//     it("input date", () => {
//         const date = new Date();
//         const a = new Alert(date);
//         expect(a).toBeDefined();
// });
//     it('input invalide data',() => {
//         const date = '123';
//         const a = new Alert(date);
//         expect(a).toEqual({});
//     })
// });

// describe("nextStep", () => {
// it('there arent any step', async () => {
//         const a = new Alert(new Date());
//         const initialise = await a.initialise();
//         initialise.step = undefined;
//         const step = await a.nextStep(initialise);
//         expect(step).toBe('record not exist');
// });
// it('normal case',async () => {
//     const a = new Alert(new Date());
//     const initialise = await a.initialise();
//     initialise.current_order = 0;
//     initialise.current_step = 1;
//     let step = await a.nextStep(initialise);
//     expect(step).toEqual('successful:'+' current_step '
//         +1 +' current_order '
//         +1)
// });
// it('normal case2',async () => {
//     const a = new Alert(new Date());
//     const initialise = await a.initialise();
//     initialise.current_order = 1;
//     initialise.current_step = 1;
//     let step = await a.nextStep(initialise);
//     expect(step).toEqual('successful:'+' current_step '
//         +2 +' current_order '
//         +0)
// });
// it('the index is on the last element',async () => {
//     const a = new Alert(new Date());
//     const initialise = await a.initialise();
//     initialise.current_order = 1;
//     initialise.current_step = 2;
//     let step = await a.nextStep(initialise);
//     expect(step).toEqual('successful:'+' current_step '
//         +2+' current_order '
//         +1+ '\nhere is the end of step');
// })
// });

// describe("previous", () => {
// it('there arent any step',async () => {
//     const a = new Alert(new Date());
//     const initialise = await a.initialise();
//     initialise.step = undefined;
//     const step = await a.previous(initialise);
//     expect(step).toBe('record not exist');
// });
// it('nomal case',async () => {
//     const a = new Alert(new Date());
//     const initialise = await a.initialise();
//     initialise.current_order = 1;
//     initialise.current_step = 2;
//     let step = await a.previous(initialise);
//     expect(step).toEqual('successful:'+' current_step '
//         +2 +' current_order '
//         +0)
// });
// it('nomal case2',async () => {
//     const a = new Alert(new Date());
//     const initialise = await a.initialise();
//     initialise.current_order = 1;
//     initialise.current_step = 1;
//     let step = await a.previous(initialise);
//     expect(step).toEqual('successful:'+' current_step '
//         +1 +' current_order '
//         +0)
// })
// it("the index is on the first element", async () => {
//     const a = new Alert(new Date());
//     const initialise = await a.initialise();
//     initialise.current_order = 0;
//     initialise.current_step = 1;
//     let step = await a.previous(initialise);
//     expect(step).toEqual("you have not authority to access");
// });
// });
describe("findAlert", async () => {
    it("invalid id", async () => {
        const a = new Alert(new Date());
        const id = "123";
        expect.assertions(1);
        return a.findAlert(id).catch(e => expect(e).toEqual("id no found"));
        // return expect(a.findAlert(id)).rejects.toEqual(
        //     'id no found'
        // );
    });
    it("valid id , recevoir an object(just display id)", async () => {
        const a = new Alert(new Date());
        expect.assertions(1);
        const id = "5aabbeaaafe36526fd4f6be5";
        const result = await a.findAlert(id);
        expect(result.id).toEqual("5aabbeaaafe36526fd4f6be5");
    });
});
