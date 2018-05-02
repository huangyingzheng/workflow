const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const Excel = require("exceljs");
const _ = require("lodash");

const connectDataBase = async function() {
    const url = "mongodb://localhost:27017";
    const mongo = await MongoClient.connect(url);
    const db = mongo.db("kp3");
    return { mongo: mongo, db: db };
};

// identify indicator we needed
const inputIdArray = async function(...id){
    const ids = [];
    for (const index of id){
        ids.push({
            header: (await findInTripleCollection(index)).name,
            //'theme-revenue.vente.vente chaussure'
            key: (await findInTripleCollection(index)).name,
            code: (await findInTripleCollection(index)).code,
            width: 25
        })
    }
    return ids;
}

// find the id in three collection, export names,return name and code;
async function findInTripleCollection(id) {
    let idInput = new ObjectId(id);

    const Mongo = await connectDataBase();

    const subThemeElementCollection = Mongo.db.collection("s.subThemeElement");

    const subThemeCollection = Mongo.db.collection("s.subTheme");

    const themeConfigCollection = Mongo.db.collection("s.themeConfig");

    let subThemeElementName = "";
    let subThemeElementCode = "";

    let subThemeName = "";
    let subThemeCode = "";

    let themeConfigName = "";
    let themeConfigCode = "";

    const subThemeElementInstance = await subThemeElementCollection.findOne({
        _id: idInput
    });

    if (subThemeElementInstance) {
        subThemeElementName = subThemeElementInstance.name;
        subThemeElementCode = subThemeElementInstance.code;
        idInput = subThemeElementInstance.subTheme.oid;
    }

    const subThemeInstance = await subThemeCollection.findOne({ _id: idInput });

    if (subThemeInstance) {
        subThemeName = subThemeInstance.name;
        subThemeCode = subThemeInstance.code;
        idInput = subThemeInstance.themeConfig.oid;
    }

    const themeConfigInstance = await themeConfigCollection.findOne({
        _id: idInput
    });

    if (themeConfigInstance) {
        themeConfigName = themeConfigInstance.name;
        themeConfigCode = "theme-" + themeConfigInstance.code;
    }

    const name = _.compact([
        themeConfigName,
        subThemeName,
        subThemeElementName
    ]).join("-");
    const code = [];
    code.push(themeConfigCode, subThemeCode, subThemeElementCode, "Mt");

    await Mongo.mongo.close();
    return {
        name: name,
        code: _.compact(code)
    };
}

//all organizations Axis; return an array
const allOrganizationAxis = async function(){
    const organizationAix = [];
    const MongoClient = await connectDataBase();
    let cursor = MongoClient.db.collection('s.organizationAxis').find()
    let object;
    while(await cursor.hasNext()){
        object = await cursor.next()
        organizationAix.push({
            header:object.name,
            key:object.name,
            id:object._id,
        })
    }
    await MongoClient.mongo.close();
    // console.log(organizationAix);
    return organizationAix;
}

async function run(){
    const MongoClient = await connectDataBase();

    //configure columns
    const columns = [];

    columns.push(...await allOrganizationAxis(),
        ...await inputIdArray('5890a67a0249e55f4ba02753',
            '59520ece7471444c9ef2951c',
            '593fc0d8733a9a1be6f62a8d',
            '595125517471444c9ef2930b'));

    //create a cursor for operation following
    const slpElementsCursor = await MongoClient.db.collection('slp.elemData')
        .find({'hic-date':{ $gt: new Date('2018-04-22'),
            $lt: new Date('2018-04-24') }})

    // get object, then do a set of implement.
    let object;
    while(await slpElementsCursor.hasNext()){
        object = slpElementsCursor.next();
        // console.log(object);
    }


    //configure workbook;
    const workbook = new Excel.Workbook();
    workbook.creator = "yingzheng";
    workbook.created = new Date();
    workbook.addWorksheet("my sheet");
    const worksheet = workbook.getWorksheet("my sheet");
    worksheet.columns =  columns;
    // worksheet.addRow(object).commit();



    //add column

    //add row


    const filename = "test2.xlsx";

    const fpath = __dirname + "/" + filename;

    workbook.xlsx
        .writeFile(fpath)
        .then(() => console.log("ok"))
        .catch(e => {
            console.log(e);
        });

    await MongoClient.mongo.close();

}
run();