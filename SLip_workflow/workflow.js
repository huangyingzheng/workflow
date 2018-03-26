const _ = require("lodash");
function create(config) {
    const { steps, profiles } = config;

    if (!Array.isArray(steps) && !Array.isArray(profiles)) {
        throw new Error("steps and profiles both are not arrays");
    } else if (!Array.isArray(steps)) {
        throw new Error("steps is not an array");
    } else if (!Array.isArray(profiles)) {
        throw new Error("profiles is not an array");
    } else if (Array.isArray(steps) && Array.isArray(profiles)) {
        if (Array.isArray(steps)) {
            const stepName = steps.map( step => step.name);
            const boolean = steps.some(step => {
                if(step.name === undefined)
                {
                    throw new Error("each step should have a name");
                }
                else if(step.actions !== undefined){
                    const boolean = step.actions.some( action => stepName.includes(action.nextStep))
                    if(!boolean){
                        throw new Error('next step should be a step')
                    }
                }
            });


        }
        if (Array.isArray(profiles)) {
            const stepName = steps.map( step => step.name);
            const boolean = profiles.some(profile => {
                if(profile.name === undefined){
                    throw new Error("each profile should have a name");
                }
                if(!Array.isArray(profile.steps)){
                    throw new Error('each profile should have an array for step');
                }
                else if(profile.steps){
                    const boolean = profile.steps.some( step => stepName.includes(step))
                    if(!boolean){
                        throw new Error('step in each profile should be a correct step')
                    }
                }
            });
        }
    }

    // here we do some validations
    // const that = this;
    function getInitialObject() {
        return {
            step: steps[0].name
        };
    }
    function getNextStep(stepInput, actionInput) {
        const stepName = stepInput.step;

        const step = steps.find(step => step.name === stepName);

        if (step === undefined) {
            return undefined;
        } else if (step.actions === undefined) {
            return undefined;
        } else {
            const nextstep = step.actions.find(action => {
                return action.name === actionInput;
            });

            return nextstep.nextStep;
        }
    }
    function isProfileInStep(stepInput, operatorInput) {
        const stepName = stepInput.step;

        const profile = profiles.find(
            profile => profile.name === operatorInput
        );

        if (profile === undefined) {
            return false;
        } else {
            const boolean = profile.steps.some(step => step === stepName);

            return boolean;
        }
    }

    return {
        getInitialObject,
        getNextStep,
        isProfileInStep
    };
}

module.exports = create;
