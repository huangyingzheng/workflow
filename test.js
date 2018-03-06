const that = this;
if (user_id === undefined && judgement === undefined) {
    const alert1 = Alert_model.create(
        {
            _id: that.id,
            date: that.date
        },
        function(err) {
            if (err) {
                // return new Error(err);
                console.error(err);
            } else {
                console.log("successful create an alert");
                return alert1;
            }
        }
    );
} else {
    if (user_id && judgement) {
        const that = this;
        Habilitation.findOne({ users_id: user_id }, function(
            err,
            habilitation
        ) {
            if (!err) {
                console.log("habilitationId", habilitation._id);
                Config.findOne({ hab_id: habilitation._id }, function(
                    err,
                    config
                ) {
                    if (!err) {
                        console.log("config", config.order);
                        console.log("judgement", judgement);
                        if (
                            config.order === that.order &&
                            judgement === "pass"
                        ) {
                            that.order++;
                            console.log(that.id);
                            Alert_model.update(
                                { date : that.id },
                                {
                                    $set: {
                                        'order': that.order,
                                        'step': "pending"
                                    }
                                },
                                function(err) {
                                    if(!err){
                                        console.log('suc')
                                    }
                                }
                            );
                        }
                    }
                });
            }
        });
    }
    // return that;
}