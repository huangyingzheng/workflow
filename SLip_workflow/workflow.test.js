const createWorkflowManger = require("./workflow");

describe("workflow mangager", () => {
    const workflowConfig = {
        steps: [
            {
                name: "intervention",
                actions: [
                    { name: "validate", nextStep: "validated" },
                    { name: "refuse", nextStep: "refuse" }
                ]
            },
            { name: "validated" },
            { name: "refused" }
        ],
        profiles: [
            { name: "validator", steps: ["intervention", "validated", "refused"] },
            { name: "controller", steps: ["validated", "refused"] }
        ]
    };

    const workflowManager = createWorkflowManger(workflowConfig);

    it("gets initial object", () => {
        expect(
            workflowManager.getInitialObject()
        ).toEqual({ step: "intervention" });
    });

    it("gets next step for action", () => {
        expect(
            workflowManager.getNextStep(
                { step: "intervention" },
                "validate"
            )
        ).toEqual("validated");
    });

    it("gets wrong step for action", () => {
        expect(
            workflowManager.getNextStep(
                { step: "interaction" },
                "validate"
            )
        ).toBeUndefined();
    });

    it("gets wrong step for undefined action", () => {
        expect(
            workflowManager.getNextStep(
                { step: "interaction" },
                "stuff"
            )
        ).toBeUndefined();
    });

    it("checks if profile is in step", () => {
        expect(
            workflowManager.isProfileInStep(
                { step: "intervention" },
                "validator"
            )
        ).toEqual(true);
    });

    it("undefined step in profile", () => {
        expect(
            workflowManager.isProfileInStep(
                { step: "intervention" },
                "controller"
            )
        ).toEqual(false);
    });

    it("not exist step in profile", () => {
        expect(
            workflowManager.isProfileInStep(
                { step: "stuff" },
                "controller"
            )
        ).toEqual(false);
    });

    it("undefined profile and undefined step", () => {
        expect(
            workflowManager.isProfileInStep(
                { step: "stuff" },
                "stuff"
            )
        ).toEqual(false);
    });
});

describe('inspect legality of the workflow',() => {

    it('both arent arrays',() =>{
        const workflowConfig = {};
        expect(() => workflow = createWorkflowManger(workflowConfig))
            .toThrowError('steps and profiles both are not arrays');
    })

    it('profiles is not an array',() =>{
        const workflowConfig = {
            steps:[1,2,3],
            // profiles:[2,3,4]
        };
        expect(() => createWorkflowManger(workflowConfig))
            .toThrowError('profiles is not an array');
    })

    it('steps is not an array',() =>{
        const workflowConfig = {
            // steps:[1,2,3],
            profiles:[{name:1}]
        };
        expect(() => createWorkflowManger(workflowConfig))
            .toThrowError('steps is not an array');
    })

    it('step havent name',() => {
        const workflowConfig = {
            steps:[1,2],
            profiles:[{name:1}]
        };
        expect(() => createWorkflowManger(workflowConfig))
            .toThrowError('each step should have a name');
    })

    it('profile havent name',() => {
        const workflowConfig = {
            steps:[{name:1}],
            profiles:[{step:1}]
        };
        // const boolean = workflowConfig.profiles.some(profile => profile.name);
        // console.log(boolean)
        expect(() => createWorkflowManger(workflowConfig))
            .toThrowError('each profile should have a name');
    })

    it('next step should be a step',() => {
        const workflowConfig = {
            steps:[
                {name:1
                    , actions:
                        [
                            {nextStep:3}]
                },
                {name:2}],
            profiles:[{name:2}]
        };
        // const stepName = workflowConfig.steps.map( step => step.name);
        // console.log(stepName);
        expect(() => createWorkflowManger(workflowConfig))
            .toThrowError('next step should be a step');
    })

    it('profile\'s step is not an array',() =>{
        const workflowConfig = {
            steps:[{name:1}],
            profiles:[{name:2,steps:'abc'}]
        };
        expect(() => createWorkflowManger(workflowConfig))
            .toThrowError('each profile should have an array for step');
    })

    it('profile\'s step should match a correct step',() =>{
        const workflowConfig = {
            steps:[{name:1}],
            profiles:[{name:2,steps:[3]}]
        };
        expect(() => createWorkflowManger(workflowConfig))
            .toThrowError('step in each profile should be a correct step');
    })

})
