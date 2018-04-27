// const db = require("./../db.js");
// const mongoose = require("mongoose");
// const User = require("./user.js");
// const Alert_model = require("./alert");
// const Habilitation = require("./habilitation.js");
// const modules1 = require("./my_module1");
// const Config = require("./workflow_config");
// const Step = require("./step.js");
// const assert = require("assert");
const _ = require('lodash')
const array = [{a:2,b:5},{a:5},{a:3},{a:2}]
const array1 =['a','b'];
for(let index of array){
    for(let i in index){
        if(array1.some(a => a === i)){
            console.log(index[i])
        }
    }
}

// const result = _.groupBy(array,(item) => {
//     return Object.keys(item).some(a => {
//         return a === 'a';
//     })
// })
// const result = _.groupBy(array,(item) => {
//     return {a:item['a']}
// })
//
// console.log(result);
// const a = { 'Shop A':
//         { cashier1: [ 1,2,3,4 ],
//             cashier2: [ 5,6,7,8 ] },
//     'Shop B':
//         { cashier1: [ 10,11 ],
//             cashier2: [ 12,13 ] },}
//
// function merge(obj){
//     _.forEach(obj,(value,key) => {
//         if(!_.isArray(value)){
//             merge(value)
//         } else{
//             console.log(value)
//         }
//     })
// }
//
// merge(a);

// const async = require('async');
// const a = function (callback){
//     async.waterfall([
//         function(callback) {
//             callback(null,4);
//         },
//         function (n,callback) {
//             if(n>5){
//                 callback(new Error('false'))
//             } else{
//                 callback(null,n)
//             }
//         }
//     ], callback);
// }
// const print = function(err,data){
//     if(err){
//         console.log(err)
//     }
//     if(!err){
//         console.log(data);
//     }
// }
//
// a(print);
// const compare5 = function(n){
//     return new Promise((resolve,reject) => {
//         if(n>5){
//             reject('false')
//         } else{
//             resolve(n)
//         }
//     })
// }
//
//
// const b = async function(callback){
//     try{
//         const result = await compare5(4);
//         callback(null,result)
//     } catch(e){
//         callback(e)
//     }
//
// }
//
// b(print);
// console.log(assert.ok(a() instanceof Promise))

// const Excel = require('exceljs');
// const fs = require('fs');
//
// const workbook = new Excel.Workbook();
//
// workbook.creator = 'yingzheng';
//
// workbook.created = new Date(2018,4,16);

// workbook.views = [
//     {
//         x: 0, y: 0, width: 10000, height: 20000,
//         firstSheet: 0, activeTab: 1, visibility: 'visible'
//     }
// ]

// const sheet = workbook.addWorksheet('my sheet');
// const sheet = workbook.addWorksheet('my sheet', {properties:{tabColor:{argb:'FF00FF00'},outlineLevelCol:100}});
//
//
// const worksheet = workbook.getWorksheet('my sheet');
// //
// // worksheet.autoFilter = {
// //     from: 'A1',
// //     to: 'C1',
// // }
// worksheet.properties.outlineLevelCol = 2;
//
// worksheet.columns = [{
//     header:'nom',key:'name',width:10
// },{ header: 'Id', key: 'id', width: 10 },{ header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }];
// const idCol = worksheet.getColumn('id');
// const nameCol = worksheet.getColumn('B');
// const dobCol = worksheet.getColumn(3);
//
// dobCol.header = 'Date of Birth';
//
// // Note: this will overwrite cell values C1:C2
// dobCol.header = ['Date of Birth', 'A.K.A. D.O.B.'];
// dobCol.key = 'dob';
//
// dobCol.width = 15;
// dobCol.hidden = true;
//
//
//
//
// worksheet.columns = [
//     { header: 'Id', key: 'id', width: 10 },
//     { header: 'Name', key: 'name', width: 32 },
//     { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 }
// ];
// // worksheet.views = [
// //     {state: 'split', xSplit: 2000, ySplit: 3000, topLeftCell: 'G10', activeCell: 'A1'}
// // ];
// const data = [{firstName: 'huang'},{firstName: 'zhang'}];
//
// // for (let index of data){
// //     worksheet.addRow(data[index]);
// // }
// // worksheet.getCell('A1').value = 'value'
// worksheet.addRow({firstName:'jh',id:13});
// worksheet.addRow({firstName:'jh',id:23});
// worksheet.addRow({firstName:'jh',id:12});
// worksheet.addRow({firstName:'jh',id:3});
//
// worksheet.getRow(4).outlineLevel = 1;
// worksheet.getRow(5).outlineLevel = 1;
// // const row = worksheet.getRow(4);
// // row.getCell(1).value = 5; // A5's value set to 5
// // row.getCell('name').value = 'Zeb'; // B5's value set to 'Zeb' - assuming column 2 is still keyed by name
// // row.getCell('C').value = new Date(); // C5's value set to now
// // row.addPageBreak();
// // worksheet.eachRow({ includeEmpty: true },function(row, rowNumber) {
// //     row.eachCell(function(cell, colNumber) {
// //         console.log('Cell ' + colNumber + ' = ' + cell.value + ' = '+ rowNumber);
// //     });
// // });
// let n =0
// worksheet.eachRow(function(row){
//     n++;
//     row.getCell('id').value = n;
//     row.getCell('name').value = 'name'+n;
//     row.getCell('C').value = new Date();
// })
// const row = worksheet.getRow(5);
// // worksheet.spliceRows(4,3);
// // var newRow3Values = [1,2,3,4,5];
// // var newRow4Values = ['one', 'two', 'three', 'four', 'five'];
// // var newRow5Values = ['one', 'two', 'three', 'four', 'five'];
// // var newRow6Values = ['one', 'two', 'three', 'four', 'five'];
// // worksheet.spliceRows(3, 3,newRow3Values,newRow5Values,newRow6Values);
// // worksheet.eachRow(function (row,rowNumber) {
// //     console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values))
// // })
// // row.splice(3,2);
//
// // remove one cell and insert two more (cells to the right of the cut cell will be shifted right)
// row.splice(4,1,'new value 1', 'new value 2');
//
// // Commit a completed row to stream
// worksheet.getCell('A1').dataValidation = {
//     type: 'decimal',
//     operator: 'between',
//     allowBlank: true,
//     showInputMessage: true,
//     formulae: [1.5, 7],
//     promptTitle: 'Decimal',
//     prompt: 'The value must between 1.5 and 7'
// };
// worksheet.getCell('A1').value = 0;
//
// const stream = fs.createReadStream('test.xlsx');
//
//
//
// // var newRow3Values = [1,2,3,4,5];
// // var newRow4Values = ['one', 'two', 'three', 'four', 'five'];
// // worksheet.spliceRows(4, 3, newRow3Values, newRow4Values);
//
//
// // row = worksheet.getRow(4).values;
// // console.log(row.values[3])
//
// // expect(row[5]).toEqual('Kyle');
// // row.values = [1,2,3];
// // row.values = {
// //     id: 13,
// //     name: 'Thing 1',
// //     dob: new Date()
// // };
// // row.addPageBreak();
// // worksheet.commit();
// stream.pipe(workbook.xlsx.createInputStream());
//
// const filename = 'test.xlsx';
// // console.log(__dirname);
//
// // const fpath = path.join(_dirname,'/'+filename);
// const fpath = __dirname + "/" + filename
//
// workbook.xlsx.writeFile(fpath).then( (err) => {
//     if(!err){
//         console.log('ok');
//     } else{
//         console.log('error');
//     }
// })



// const keys = Object.keys(anObj);
// const result = keys.find(key => {return cles.find(cle => cle === key)})
// console.log(result)


//
// const batteriesFinder = function(dir) {
//
//     // check recursively in dir and subdirs if .js files are exporting objects like {type: "testBattery"}
//     return _(fs.readdirSync(__dirname + dir)).flatMap(function(fileName) {
//         let batteries;
//
//         if(regexJS.test(fileName)) {
//             batteries = forceArray(require("." + dir + "/" + fileName)).filter(o => o && o.type === "testBattery");
//         }
//         else if(fs.lstatSync(__dirname + dir + "/" + fileName).isDirectory()) {// 判断是文件方式文件夹
//             batteries = batteriesFinder(dir + "/" + fileName);
//         }
//         return batteries;
//     }).compact().value();// compact all element, resolve unwappe value,变回数组.
// };
//
// function test() {
//     batteriesFinder(SLip_workflow);
// }
// test();

// export async function Start(){
//     const val = await Habilitation.findOne({_id:'5aa91f2c571bd12efcdf7d62'},function(err,val){return val});
//     val.findONE(function (val) {
//         console.log(val);
//     })
// }
// Start();

// const alert = new Alert_model({_id : new mongoose.Types.ObjectId()})
// const number = 3;
// for (let i =0; i < 3; i++){
//     alert.step.push([]);
// }
// alert.save();

// async function ff() {
//     const promise = new Promise(function(resolve,reject){
//         setTimeout((resolve('good')),0);
//     });
//     const p = await promise;
//     const p1 = p+1;
//     // assert.ok(p instanceof Promise)
//     return p1;
// }
//
// // const ff = (f) => {
// //     return f(10);
// // }
//
// const fff = async () => {
//     const f =  await ff();
//     // assert.ok(f instanceof Promise);
//     console.log(f);
//
// }
// fff();
// var getNumbers = () => {
//     return Promise.resolve([1, 2, 3])
// }
// var multi = num => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//         if (num) {
//             resolve(num * num)
//         } else {
//             reject(new Error('num not specified'))
//         }
//     }, 1000)
// })
// }
// async function test () {
//     var nums = await getNumbers()
//     for(let index = 0; index < nums.length; index++) {
//         () => {console.log(1)};
//         (async x => {
//             console.log(2)
//             var res = await multi(x)
//             console.log(res)
//         })(nums[index])
//         console.log(3);//上一条程序还没哟结束就开始执行下一条程序了。
//         /*forEach()的机制就是，将array里面的东西一次性，同步执行回调函数
//         * */
//     }
// }
// test()


/*create step
* */
// const step1 = new Step({
//     _id: new mongoose.Types.ObjectId(),
//     name: "step_2"
// });
//
// Config.find({ step: 1 }).then(val => {
//     val.forEach(function(result) {
//         step1.comprises.push(result._id);
//         step1.save();
//     });
// });





/*test previous code*/
// modules1.saveAlert(new Date());
// const s = modules1.beExecute('5a9ffd51321b5643631e1168','5a9d0f75568cc91a3e3d3359','agree');
// s.then(() => {console.log('successful')},(err) => {console.log(err)});
// s.catch(err => {console.log(err)})
// s.then(val => {console.log(val)})
// console.log(typeof s);
// s.then(val => {console.log(val)})
// .then(val => {console.log(val)})
// console.log(string);
// _id:'5a9fb4c357161c1f46ea08eb' order 2
//'5a993179661aa026d7ee44f5' order 1
//'5a9d0f75568cc91a3e3d3359' order 3





// Config.create({_id: new mongoose.Types.ObjectId, hab_id:undefined,profile:'order3',order:2,step:1});
//
// Habilitation.findOne({_id:'5aa91f2c571bd12efcdf7d62'},function(err,result){
//     if (err){
//         console.log(err);
//     }
//     else{
//         Config.findOne({_id:'5aa91edd4abcb82ebe7e309f'},function(err,config){
//             if(err){
//                 console.log(err)
//             }
//             else{
//                 config.addHab(result,function(err){
//                     console.log(err);
//                 });
//             }
//         })
//     }
// })

// User.create({_id: new mongoose.Types.ObjectId(),name: 'D'});
//
// Habilitation.create({_id: new mongoose.Types.ObjectId(),name: 'department manager'});
//
// Habilitation.findOne({_id:'5aa91f2c571bd12efcdf7d62'},function(err,hab){
//     if(err){
//         console.log(err)
//     }
//     else{
//         User.findOne({_id:'5a9fb4c357161c1f46ea08eb'},function(err,user){
//             hab.addUser(user,function(err){if(!err){console.log('s')}})
//         })
//     }
// })

// const test = async () => {
//     try{
//         const result = await Alert_model.findOne({_id:"5a9fef608bc8ec3a1316b59f"})
//             .exec();
//         return result;
//     }
//     catch(err) {
//         console.log(err);
//     }
// }
// test().then(val => {
//     console.log(val)
// });

// Alert_model.findOne({_id:"5a9fef608bc8ec3a1316b59f"})
//     .then(val => {console.log(val)},err => {console.log(err)});

// Habilitation.find({_id:'5a993179661aa026d7ee44f8'}).then(val => {console.log(val[0].users_id)});
