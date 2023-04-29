const Sequelize = require('sequelize');
const db = require('../config/db');

// 创建model
const PrizePlanModel = db.define('prize_plan', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        desc: {
            type: Sequelize.STRING,
            field: 'desc'
        },
        mark: {
            type: Sequelize.STRING,
            field: 'mark'
        },
        state: {
            type: Sequelize.INTEGER,
            field: 'state'
        },
        userFilePath: {
            type: Sequelize.STRING,
            field: 'user_file_path'
        }
    },
    {
        // 将createdAt对应到数据库的created_at字段
        createdAt: 'created_at',
        // 将updatedAt对应到数据库的updated_at字段
        updatedAt: 'updated_at',
        //And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
        deletedAt: 'deleted_at', //'deleted_at',
        //删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
        paranoid: true
    }
);

module.exports = PrizePlanModel