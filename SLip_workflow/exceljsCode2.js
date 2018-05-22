const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const Excel = require("exceljs");
const _ = require("lodash");

const connectDataBase = async function() {
    const url = "mongodb://localhost:27017";
    const mongo = await MongoClient.connect(url);
    const db = mongo.db("kp4");
    return { mongo: mongo, db: db };
};

function splitName(inputNames) {
    const names = inputNames.split(".");
    const nameInArray = names.map(name => {
        return translateName(name, "fr");
    });
    return nameInArray.join(".");
}
function translateName(rawName = "", language = "fr") {
    const names = rawName.split("\n");
    const nameForLgn = lng => names.find(t => t.match(new RegExp(`^${lng}::`)));

    const name = nameForLgn(language) || names[0];
    return name.replace(/^\w+::\s*/, "");
}

// identify indicator we needed
const inputIdArray = async function(string,id) {
    const ids = [];
    for (const index of id) {
        ids.push({
            header: splitName((await findInTripleCollection(index,string)).name),
            // version regrouper
            key: (await findInTripleCollection(index,string)).name,
            // //version elementaire
            // key: (await findInTripleCollection(index,string)).key,
            code: (await findInTripleCollection(index,string)).key,
            width: 25
        });
    }
    return ids;
}

// find the id in three collection, export names,return name and code;
async function findInTripleCollection(id,string) {
    let idInput = new ObjectId(id);

    const MongoClient = await connectDataBase();

    const subThemeElementCollection = MongoClient.db.collection("s.subThemeElement");

    const subThemeCollection = MongoClient.db.collection("s.subTheme");

    const themeConfigCollection = MongoClient.db.collection("s.themeConfig");

    const subThemeElementInstance = await subThemeElementCollection.findOne({
        _id: idInput
    })


    idInput = _.get(subThemeElementInstance,['subThemeElementInstance','subTheme'],idInput);
    const subThemeElementName= _.get(subThemeElementInstance,['subThemeElementInstance','name'],'')
    const subThemeElementCode = _.get(subThemeElementInstance,['subThemeElementInstance','code'],'')
    // console.log(subThemeElementName);
    // console.log(subThemeElementInstance);

    // TODO you can use _.get to securely get properties of an object and assign default values
    // ex: const subThemeElementName
    // if (subThemeElementInstance) {
    //     subThemeElementName = subThemeElementInstance.name
    //     subThemeElementCode = subThemeElementInstance.code
    //
    //     // TODO now subTheme is an ObjectID
    //     idInput = subThemeElementInstance.subTheme
    // }

    const subThemeInstance = await subThemeCollection.findOne({ _id: idInput })
    idInput = _.get(subThemeInstance,['subThemeInstance','themeConfig'],idInput);
    const subThemeName= _.get(subThemeInstance,['subThemeInstance','name'],'')
    const subThemeCode = _.get(subThemeInstance,['subThemeInstance','code'],'')
    // console.log(subThemeInstance);

    // if (subThemeInstance) {
    //     subThemeName = subThemeInstance.name
    //     subThemeCode = subThemeInstance.code
    //     // TODO now themeConfig is an ObjectID
    //     idInput = subThemeInstance.themeConfig
    // }

    const themeConfigInstance = await themeConfigCollection.findOne({
        _id: idInput
    })

    const themeConfigName= _.get(themeConfigInstance,['name'],'')
    const themeConfigCode = 'theme-'+_.get(themeConfigInstance,['code'],'')
    // console.log(themeConfigInstance.name);
    // console.log(themeConfigName);
    // if (themeConfigInstance) {
    //     themeConfigName = themeConfigInstance.name
    //     themeConfigCode = 'theme-' + themeConfigInstance.code
    // }

    const name = _.compact([
        themeConfigName,
        subThemeName,
        subThemeElementName,
        string
    ]).join('-')

    const key = _.compact([
        themeConfigCode,
        subThemeCode,
        subThemeElementCode,
        string
    ]).join('.')


    // if (themeConfigInstance) {
    //     themeConfigName = themeConfigInstance.name
    //     themeConfigCode = 'theme-' + themeConfigInstance.code
    // }

    // const name = _.compact([
    //     themeConfigName,
    //     subThemeName,
    //     subThemeElementName,
    //     string
    // ]).join('-')
    //
    // const key = _.compact([
    //     themeConfigCode,
    //     subThemeCode,
    //     subThemeElementCode,
    //     string
    // ]).join('.')
    await MongoClient.mongo.close();

    return {
        name,
        key
    }



}

//all organizations Axis; return an array
const allOrganizationAxis = async function() {
    const organizationAix = [];
    const MongoClient = await connectDataBase();
    let cursor = MongoClient.db.collection("s.organizationAxis").find();
    let object;
    while (await cursor.hasNext()) {
        object = await cursor.next();
        organizationAix.push({
            header: object.name,
            key: object.code,
            id: object._id,
            width: 18
        });
    }
    await MongoClient.mongo.close();
    return organizationAix;
};

async function run() {
    console.time("time");

    const MongoClient = await connectDataBase();

    //configure columns
    const columns = [];

    const indicateurNb = await inputIdArray('Nb',
        ["591c6137ffdad321a32f9558","5890a67a0249e55f4ba02753"]
    );

    const indicateurMt = await inputIdArray('Mt',
        ["591c6137ffdad321a32f9558","5890a67a0249e55f4ba02753"]
    );



    const indicateur = [];
    // console.log(indicateurMt)
    // console.log(indicateur)

    for(let i=0, s=0;i<indicateurMt.length +indicateurNb.length;i++)
    {
        if(s<indicateurMt.length){
            indicateur.push(indicateurMt[i]);
        }
        if(s<indicateurNb.length){
            indicateur.push(indicateurNb[i]);
        }
        s++;
    }
    // console.log(indicateur1)


    columns.push(...(await allOrganizationAxis()));

    // //elementaire version
    // columns.push({ header: "date", key: "hic-date", width: 14 },
    //     { header: "magasin", key: "hic-shop", width: 28 },
    //     { header: "cashier", key: 'hic-cashier', width: 18 })

    //regroup version
    columns.push(
        { header: "Date", key: "date", width: 14 },
        { header: "Magasin", key: "shop", width: 28 },
        { header: "Cashier", key: "cashier", width: 18 }
    );

    columns.push(...indicateur);
    // console.log(indicateur1)
    // console.log(columns)

    // const formFixedField= () =>{
    //
    // }

    const groupForm = {
        _id: {
            shop: "$hic-shop",
            cashier: "$hic-cashier",
            date: "$hic-date",
            organizations: "$organizations"
        }
    };

    // console.log(indicateur)
    const formWithIndicator = indicateur.reduce((object, item) => {
        object = {
            ...object,
            [item.key.toString()]: { $sum: "$" + item.code.toString() }
        };
        // console.log(object);
        return object;
    }, groupForm);

    const groupByIndicator = { $group: formWithIndicator };

    // create a cursor for operation following
    const slpElementsCursor = MongoClient.db
        .collection("slp.elemData")
        .aggregate(
            [
                {
                    $match: {
                        "hic-date": {
                            $gt: new Date("2018-04-15"),
                            $lt: new Date("2018-04-17")
                        }
                    }
                },
                groupByIndicator
            ],
            { allowDiskUse: true }
        );

    const options = {
        filename: "des.xlsx",
        useStyles: true,
        useSharedStrings: true
    };
    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    workbook.creator = "yingzheng";
    workbook.created = new Date();
    workbook.addWorksheet("my sheet");
    const worksheet = workbook.getWorksheet("my sheet");
    worksheet.columns = columns;
    let object;
    worksheet.getColumn('date').numFmt = "dd-MM-yyyy";
    worksheet.getRow('1').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb:'E0E0E0'},
        bgColor: {argb:'E0E0E0'}
    }
    worksheet.getRow('1').font = {
        bold: true
    };
    async function tabOrganizationAxis(){
        const MongoClient = await connectDataBase();
        const objectEmpty = {};
        const cursor = MongoClient.db.collection("s.organizationAxis").find();
        while (await cursor.hasNext()){
            const object = await cursor.next();
            objectEmpty[object._id] = object.name;
        }
        await MongoClient.mongo.close();
        return objectEmpty;
    }

    const tabOrgAxis = await tabOrganizationAxis();

    let i = 0;
    while (await slpElementsCursor.hasNext()) {
        let object = await slpElementsCursor.next();
        //data elementaire
        // if(object['theme-Vente']){
        //     object['theme-Vente.Nb'] = object['theme-Vente']['Nb'];
        // }
        // if( object['theme-CA net']){
        //     object['theme-CA net.Mt'] = object['theme-CA net']['Mt'];
        // } else{
        //     object['theme-CA net.Mt'] = 0;
        // }
        //
        // if(object['theme-Remise']){
        //     if(object['theme-Remise']['Manuelle hors STW']){
        //         object['theme-Remise.Manuelle hors STW.Mt'] = object['theme-Remise']['Manuelle hors STW']['Mt']
        //     } else {
        //         object['theme-Remise.Manuelle hors STW.Mt'] = 0;
        //     }
        // } else {
        //     object['theme-Remise.Manuelle hors STW.Mt'] = 0;
        // }
        //
        // if(object['theme-Remise']){
        //     if(object['theme-Remise']['STW']){
        //         if(object['theme-Remise']['STW']['9']){
        //             // console.log( object['theme-Remise']['STW']['9']['Mt']);
        //             object['theme-Remise.STW.9.Mt'] = object['theme-Remise']['STW']['9']['Mt']
        //             // console.log(object['theme-Remise.STW.9.Mt']);
        //
        //         } else {
        //             object['theme-Remise.STW.9.Mt'] = 0;
        //         }
        //     } else {
        //         object['theme-Remise.STW.9.Mt'] = 0;
        //     }
        // } else {
        //     object['theme-Remise.STW.9.Mt'] = 0;
        // }
        // const name  = await MongoClient.db.collection('s.organization').findOne({code: object.FILIALE.toString()});
        // object.FILIALE = name.name;
        // const region = await MongoClient.db.collection('s.organization').findOne({code: object.REGION.toString()});
        // object.REGION = region.name;
        // const zone = await MongoClient.db.collection('s.organization').findOne({code: object.ZONE.toString()});
        // object.ZONE = zone.name;
        // const shop = await MongoClient.db.collection('s.shop').findOne({code:object['hic-shop'].toString()});
        // object.shop = `${shop.code}-${shop.name}`;
        // console.log(object)

        // export keys from champ "_id"
        object = Object.keys(object._id).reduce((acc, key) => {
            return { ...acc, [key]: acc._id[key] };
        }, object);

        const organizations = await MongoClient.db.collection("s.organization")
            .find({_id: {$in: object.organizations}})
            .toArray();

        for(const organization of organizations){
            const organizationAxiId = organization.organizationAxis.toString();
            object ={...object,[tabOrgAxis[organizationAxiId]]:organization.name}
        }

        // const name = await MongoClient.db
        //     .collection("s.organization")
        //     .findOne({ code: object.FILIALE.toString() });
        // object.FILIALE = name.name;
        // const region = await MongoClient.db
        //     .collection("s.organization")
        //     .findOne({ code: object.REGION.toString() });
        // object.REGION = region.name;
        // const zone = await MongoClient.db
        //     .collection("s.organization")
        //     .findOne({ code: object.ZONE.toString() });
        // object.ZONE = zone.name;
        const shop = await MongoClient.db
            .collection("s.shop")
            .findOne({ code: object.shop.toString() });
        object = {...object,
            shop : `${shop.code}-${shop.name}`}

        console.log(i++)

        worksheet.addRow(object).commit();
    }

    workbook
        .commit()
        .then(function() {
            console.log("the stream has been written");
        })
        .catch(err => {
            console.log(err);
        });

    await MongoClient.mongo.close();
    console.timeEnd("time");
}
run();
