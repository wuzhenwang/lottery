// 1. 引入依赖
const multer = require('multer');
const md5 = require('md5');

// 2. 引入工具
const path = require('path') //
const resolve = (dir) => {
    return path.join(__dirname, './', dir)
}

// 3. multer的配置对象
let storage = multer.diskStorage({
    // 3.1 存储路径
    destination: function (req, file, cb) {
        // 3.1.1 允许图片上传
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            // cb(null, resolve('../../product/src/img'))
            cb(null, resolve('../../product/dist/img'))
        }
        // else if (file.mimetype === 'image/jpeg') {
        //     cb(null, resolve('../data'))
        // }
        else if (file.originalname.indexOf('.xlsx') > -1 || file.originalname.indexOf('.xls') >-1) {
            cb(null, resolve('../data'))
        }
        else {
            // 3.1.2 限制其他文件上传类型
            cb({ error: '文件非法，请确认！目前支持文件格式：jpg、png、xlsx、xls' })
        }

    },
    //  3.2 存储名称
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null, md5(+new Date()) + "." + fileFormat[fileFormat.length - 1]);
    },
});

// 4. 添加配置
const multerConfig = multer({
    storage: storage,
});

// 5. 导出配置好的multerConfig
module.exports = multerConfig;
