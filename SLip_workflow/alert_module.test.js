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
//         expect.assertions(1)
//         return a.catch(e => expect(e).toEqual("invalid object"));
//     })
// });

// describe("nextStep", () => {
// it('there arent any step', async () => {
//         let a = new Alert(new Date());
//         await a.initialise(2);
//         a.alert.step = undefined;
//         expect.assertions(1);
//         return a.nextStep().catch(e => expect(e).toEqual('record not exist'));
//         // expect(a).toBe('record not exist');
// });
// it('normal case',async () => {
//     let a = new Alert(new Date());
//     await a.initialise(2);
//     await a.addController(0);
//     await a.addManager(1,1);
//     a.alert.current_order = 0;
//     a.alert.current_step = 1;
//     expect.assertions(1);
//     await expect(a.nextStep()).resolves.toEqual('successful:'+' current_step '
//         +1 +' current_order '
//         +1)
// });
// // it('normal case2',async () => {
// //     const a = new Alert(new Date());
// //     const initialise = await a.initialise(2);
// //     initialise.current_order = 1;
// //     initialise.current_step = 1;
// //     let step = await a.nextStep(initialise);
// //     expect(step).toEqual('successful:'+' current_step '
// //         +2 +' current_order '
// //         +0)
// // });
// it('the index is on the last element',async () => {
//     let a = new Alert(new Date());
//     await a.initialise(2);
//     await a.addController(0);
//     await a.addManager(1,1);
//     a.alert.current_order = 1;
//     a.alert.current_step = 1;
//     expect.assertions(1);
//     await expect(a.nextStep()).resolves.toEqual('successful:'+' current_step '
//         +1+' current_order '
//         +1+ '\nhere is the end of step');
// })
// });

describe("previous", () => {
// it('there arent any step',async () => {
//     let a = new Alert(new Date());
//     await a.initialise(2);
//     a.alert.step = undefined;
//     expect.assertions(1);
//     return a.previous().catch(e => expect(e).toEqual('record not exist'));
//         // expect(a).toBe('record not exist');
// });
// it('nomal case',async () => {
//     let a = new Alert(new Date());
//     await a.initialise(2);
//     await a.addController(0);
//     await a.addManager(1,1);
//     a.alert.current_order = 1;
//     a.alert.current_step = 1;
//     expect.assertions(1);
//     await expect(a.previous()).resolves.toEqual('successful:'+' current_step '
//         +1 +' current_order '
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
});
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
        let a = new Alert(new Date());
        expect.assertions(1);
        const id = "5ab0e09068f0e2212d53560d";
        a = await a.findAlert(id);
        expect(a.alert._id.toString()).toEqual("5ab0e09068f0e2212d53560d");
    });
});
// describe("initialise", async () => {
//     it("normal case", async () => {
//         let a = new Alert(new Date());
//         await a.initialise(3);
//         return expect(a.alert.current_step).toEqual(1);
//     });
//     it('step number too small',async () => {
//         const a = new Alert(new Date());
//         let alert = a.initialise(1);
//         expect.assertions(1);
//         return alert.catch(e => expect(e).toEqual("Step number necessity more than 2"));
//     })
//     // it('can not save')
// });
// describe('addController',async() => {
//     it('work_config correspond no found',async() => {
//         const a = new Alert(new Date());
//         let alert = a.initialise(2)
// })
// })
