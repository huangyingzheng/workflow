const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const Excel = require("exceljs");
const _ = require("lodash");

// Parameters
// const FILE_NAME =
// const BEGIN_DATE =
// const GROUP_ID =
// const ID_INDICATIVE =

const connectDataBase = async function() {
    const url = "mongodb://localhost:27017";
    const mongo = await MongoClient.connect(url);
    const db = mongo.db("kp3");
    return { mongo: mongo, db: db };
};

const inputIdArray = async function(...numbers) {
    const a = [];
    for (const index of numbers) {
        a.push({
            header: (await findInTripleCollection(index)).name,
            //'theme-revenue.vente.vente chaussure'
            key: (await findInTripleCollection(index)).name,
            code: (await findInTripleCollection(index)).code,
            width: 25
        });
    }
    return a;
};

const filterDateByStream = function(objectDate, date1, date2) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    console.log(1);
    return objectDate > startDate && objectDate < endDate;
};

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
    ]).join("----->");
    const code = [];
    code.push(themeConfigCode, subThemeCode, subThemeElementCode, "Mt");
    // console.log(_.compact(code));
    Mongo.mongo.close();
    return {
        name: name,
        code: _.compact(code)
    };
}

async function shopInfoConcrete(newElements) {
    const objects = [];
    const Mongo = await connectDataBase();
    const shopCollection = Mongo.db.collection("s.shop");
    const organizationCollection = Mongo.db.collection("s.organization");

    for (const index of newElements) {
        const shopInstance = await shopCollection.findOne({
            _id: index.shop.oid
        });

        for (const indexTwo of shopInstance.organizations) {
            const organizationInstance = await organizationCollection.findOne({
                _id: indexTwo.oid
            });

            const organizationAxis = await Mongo.db
                .collection("s.organizationAxis")
                .findOne({ _id: organizationInstance.organizationAxis.oid });

            const objectToPush = {
                id: shopInstance._id.toString(),
                shopName: shopInstance.name,
                organizationAxis: organizationAxis.name,
                organization: organizationInstance.name
            };
            objects.push(objectToPush);
        }
    }
    Mongo.mongo.close();
    return objects;
}

async function run() {
    const Mongo = await connectDataBase();
    const slpElemDataCollection = Mongo.db.collection("slp.elemData");
    // const test = await slpElemDataCollection.findOne();
    // const revenueBis = [`theme-revenue`,'revenue.Bis','Ticket T1']
    // console.log(_.get(test,revenueBis));
    // const slpElements = await slpElemDataCollection.find().toArray();
    const slpElements = await slpElemDataCollection
        .find({
            "hic-date": {
                $gt: new Date("2018-04-21"),
                $lt: new Date("2018-04-24")
            }
        })
        .toArray();
    const newElements = slpElements.reduce((acc, slpElement) => {
        acc.push(slpElement);
        return acc;
    }, []);
    const shopInfos = await shopInfoConcrete(newElements);

    /*------------------------------------------------------------------------------------*/

    const workbook = new Excel.Workbook();
    workbook.creator = "yingzheng";
    workbook.created = new Date();
    workbook.addWorksheet("my sheet");
    const worksheet = workbook.getWorksheet("my sheet");

    // for(let value of objects){
    //     if(!columns.some((column)=>column.header === value.organizationAxis)){
    //         columns.push({header:value.organizationAxis,key:value.organizationAxis,width:18});
    //     }
    // }
    const columns = shopInfos.reduce((acc, curr) => {
        if (!acc.some(ac => ac.header === curr.organizationAxis)) {
            acc.push({
                header: curr.organizationAxis,
                key: curr.organizationAxis,
                width: 15
            });
        }
        return acc;
    }, []);

    columns.push(
        { header: "date", key: "hic-date", width: 14 },
        { header: "magasin", key: "shopName", width: 18 },
        { header: "caissier", key: "hic-cashier", width: 18 }
    );

    const ids = await inputIdArray(
        "5890a67a0249e55f4ba02753",
        "59520ece7471444c9ef2951c",
        "593fc0d8733a9a1be6f62a8d"
    );
    const idsNameArray = ids.reduce((acc, curr) => {
        acc.push(curr.header);
        return acc;
    }, []);

    columns.push(ids);

    //对同一行的数据进行合并
    // function merge(obj) {
    //     return _.map(obj, (value) => {
    //         if (!_.isArray(value)) {
    //             return merge(value);
    //         } else {
    //             const valueFix = Object.assign({}, value[0]);
    //             for (let index of idsNameArray) {
    //                 valueFix[index] = 0;
    //             }
    //             const a = value.reduce((acc, curr) => {
    //                 // curr是一个记录
    //                 for (let i in curr) {
    //                     //i是key
    //                     if (idsNameArray.some(item => item === i)) {
    //                         // console.log(i + '--->'+ acc[i])
    //                         if (!curr[i]) {
    //                             acc[i] = acc[i] + 0;
    //                         } else {
    //                             acc[i] = acc[i] + curr[i];
    //                         }
    //                     }
    //                 }
    //                 return acc;
    //             }, valueFix);
    //             return a;
    //         }
    //     });
    // }
    function merge(objs) {
        return _.map(objs, obj => {
            const valueFix = Object.assign({}, obj[0]);
            for (let key of idsNameArray) {
                valueFix[key] = 0;
            }
            return obj.reduce((acc, curr) => {
                for (let key in curr) {
                    if (idsNameArray.some(item => item === key)) {
                        if (!curr[key]) {
                            acc[key] = acc[key] + 0;
                        } else {
                            acc[key] = acc[key] + curr[key];
                        }
                    }
                }
                return acc;
            }, valueFix);
        });
    }
    //整合columns
    worksheet.columns = _.flattenDeep(columns);

    const newElementsChange = newElements.map(newElement => {
        //找到目标数据
        const targetArray = shopInfos.filter(shopInfo => {
            return shopInfo.id === newElement.shop.oid.toString();
        });

        // for (const index of targetArray) {
        //     newElement[index.organizationAxis] = index.organization;
        //     newElement.shopName = index.shopName;
        // }
        // return newElement
        // console.log(targetArray)

        //将目标数据整合到输出数据上
        const newElement2 = targetArray.reduce(
            (acc, curr) => {
                acc[curr.organizationAxis] = curr.organization;
                return acc;
            },
            { ...newElement }
        );

        //加入新的属性，名字叫shopName
        newElement2.shopName = targetArray[0].shopName;

        //加入indicateur 属性下的数据，code是用来搜索的，name是key
        const newElement3 = ids.reduce((acc, curr) => {
            acc[curr.header] = _.get(acc, curr.code);
            return acc;
        }, newElement2);

        return newElement3;
    });

    //将原本要输出的数据进行分类，三重子类
    const object = _.groupBy(newElementsChange, newElement => {
        return (
            newElement["hic-date"] +
            "-" +
            newElement["shopName"] +
            "-" +
            newElement["hic-cashier"]
        );
    });

    // for (let key in object) {
    //     object[key] = _.groupBy(object[key], item => {
    //         return item["shopName"] + '-' + item["hic-cashier"];
    //     });
    // for (let i in object[key]) {
    //     object[key][i] = _.groupBy(object[key][i], it => {
    //         return it["hic-cashier"];
    //     });
    // }
    // }
    // console.log(object);

    //将每一子类的数据进行整个，得到合并数据
    const a = _.flattenDeep(merge(object));

    // newElementsChange.forEach(newElement => {
    //     worksheet.addRow(newElement);
    // });
    // console.log(newElementsChange[0])

    //将新的数据插入表格
    a.forEach(newElement => {
        worksheet.addRow(newElement);
    });

    const filename = "test.xlsx";

    const fpath = __dirname + "/" + filename;

    workbook.xlsx
        .writeFile(fpath)
        .then(() => console.log("ok"))
        .catch(e => {
            console.log(e);
        });

    await Mongo.mongo.close();
}

run();

// inputIdArray('595caa708e5f2404eda651ea','58ef2f945916fc0341328629')
// async function runn(){
//     try{
//         const url = 'mongodb://localhost:27017'
//
//         const mongo = await MongoClient.connect(url);
//
//         const db = mongo.db('kp3')
//
//         const s_alert = db.collection('slp.elemData');
//
//         const stream = s_alert
//             .find().stream();
//
//         const options = {
//             filename: './test_stream.xlsx',
//             useStyles: true,
//             useSharedStrings: true
//         };
//
//         const workBookStream = new Exceljs.stream.xlsx.WorkbookWriter(options);
//
//         workBookStream.creator = 'yingzheng';
//
//         workBookStream.created = new Date();
//
//         const sheet = workBookStream.addWorksheet('my sheet');
//
//         const worksheet = workBookStream.getWorksheet('my sheet');
//
//         worksheet.columns = [{},{
//             header: 'City',key:'city',width:12
//         },{
//             header: 'State',key:'state',width:12
//         },{
//             header:'Cluster',key:'cluster',width:12
//         },{
//             header:'Zone',key:'zone',width:12
//         },{
//             header:'Shop',key:'shop',width:12
//         },{
//             header:'Date',key:'date',width:18
//         },{
//             header:'Cashier',key:'cashier',width:12
//         }
//         ];
//
//         const newColumn = worksheet.getColumn(8)
//         // newColumn.header = 'key'
//         // keyName = 'key';
//         // newColumn.key = 'key';
//         // console.log(worksheet.columns.length)
//
//         // const newColumns = {};
//         // newColumns.header = 'theme';
//         // newColumns.key = 'theme';
//         // worksheet.columns.push(newColumns);
//
//         while (await stream.hasNext()) {
//             const object = await stream.next()
//             // const array = [];
//             // let keyName = undefined;
//             console.log(worksheet.columns.length)
//
//
//             for(let key in object){
//                 if (/theme-/.test(key)){
//                     // 所有符合的键
//                     if(worksheet.columns.some((result) => {
//                         if(result._key === key){
//                             return true; }
//                         })){
//                         console.log(true);
//                     } else{
//                         console.log(key);
//                         console.log(false);
//                         const newColumn = worksheet.getColumn(worksheet.columns.length+1)
//                         newColumn.header = key;
//                         newColumn.key = key;
//                         newColumn.width = 15;
//                     }
//
//                     // console.log(worksheet.columns);
//                     // console.log(array);
//                     // return keyName;
//                 }
//             }
//             // console.log(worksheet);
//
//             const record ={
//                 city:object.City, state: object.State, cluster: object.Cluster
//                 ,zone:object.Zone, date:object["hic-date"]
//                 ,cashier:object["hic-cashier"],shop: object["hic-shop"]
//                 // ,[newColumn.key]:'12364564'
//             }
//             worksheet.addRow(record)
//         }
//
//         await worksheet.commit();
//
//         await workBookStream.commit();
//
//
//         await mongo.close();
//
//
//
//     } catch(err) {
//         console.error(err);
//     }
// }
