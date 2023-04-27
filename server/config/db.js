const Sequelize = require('sequelize');

const db = new Sequelize('nxb_yuhengyaoye_3.2', 'root', '1qaz!QAZ', {
    host: '111.204.36.181',
    dialect: 'mysql',
    pool: {
        max: 15,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        chartset: 'utf8mb4'
    },
    define: {
        freezeTableName: true,   //自定义表面，不设置会自动将表名转为复数形式
        timestamps: true //自动生成更新时间、创建时间字段：updatedAt,createdAt
    }
})

db.authenticate().then(() => {
    console.log('mysql连接成功');
}).catch(err => {
    console.log('mysql连接失败：' + err);
})

module.exports = db