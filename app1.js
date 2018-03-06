const async = require("async");
class File {
    constructor() {}

    // 创建文件
    createFile(callback) {
        setTimeout(() => {
            if (0) {
                console.log("创建文件失败");
                callback("err");
            } else {
                console.log("创建文件成功");
                callback(null);
            }
        }, 100);
    }

    // 写文件
    writeFile(callback) {
        setTimeout(() => {
            if (0) {
                console.log("写文件失败");
                callback("err");
            } else {
                console.log("写文件成功");
                callback(null);
            }
        }, 100);
    }

    // 读文件
    readFile(callback) {
        setTimeout(() => {
            if (0) {
                console.log("读文件失败");
                callback("err");
            } else {
                console.log("读文件成功");
                callback(null, "I love async!");
            }
        }, 100);
    }
}
var file = new File();

async.waterfall(
    [
        function(callback) {
            file.createFile(function(err) {
                if (!err) {
                    callback(null, "createFile Ok");
                } else {
                    callback("createFileFail");
                }
            });
        },
        function(err, callback) {
            file.writeFile(function(err) {
                if (!err) {
                    callback(null, "writeFile Ok");
                } else {
                    callback("writeFileFail");
                }
            });
        },
        function(err, callback) {
            file.readFile(function(err) {
                if (!err) {
                    callback(null, "readFile Ok");
                } else {
                    callback("readFileFail");
                }
            });
        }
    ],
    function(err, result) {
        console.log(err);
        console.log(result);
    }
);
