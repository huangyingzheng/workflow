const _ = require("lodash");
const module1 = require("./my_module1");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

describe("beExecute", () => {
    const alert1 = { _id: mongoose.Types.ObjectId('5a9fef608bc8ec3a1316b59f'), order: 1, step: "pending", date: new Date() };
    const use r = { _id: mongoose.Types.ObjectId(2), name: "huang" };
    const habilitation = { _id: mongoose.Types.ObjectId(3), name: "directeur", users_id: [mongoose.Types.ObjectId(2)] };
    const config = { _id: mongoose.Types.ObjectId(4), hab_id: mongoose.Types.ObjectId(3), profile: "manager", order: 1 };
    it("all is well", async () => {
        // expect.assertions(1);
        const id = alert1._id;
        const user_id = user._id;
        const judgement = 'agree';
        const data = module1.beExecute(id,user_id,judgement).then(val => {return val});

        expect(data).toEqual({});
    });
});
