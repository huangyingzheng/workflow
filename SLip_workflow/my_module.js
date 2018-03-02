const mongoose = require('mongoose');
const Config = require('./workflow_config');
class Alert {
    constructor(date, place,person) {
        this.date = date;
        this.place = place;
        this.person = person;
    }
    beExecute(user_id,order){

        const finish = false:
        if(user_id || order === false ){
            const Alert = new Alert({

            })
        }
    }
}

module.exports = Alert;