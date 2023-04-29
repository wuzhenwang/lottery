const Sequelize = require('sequelize');
const db = require('../config/db');

// 创建model
const PrizeModel = db.define('prize', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    planId: {
        type: Sequelize.INTEGER,
        field: 'plan_id'
    },
    type: {
        type: Sequelize.INTEGER,
        field: 'type'
    },
    text: {
        type: Sequelize.STRING,
        field: 'text'
    },
    count: {
        type: Sequelize.INTEGER,
        field: 'count'
    },
    title: {
        type: Sequelize.STRING,
        field: 'title'
    },
    eachCount: {
        type: Sequelize.INTEGER,
        field: 'each_count'
    },
    img: {
        type: Sequelize.STRING,
        field: 'img'
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
)

module.exports = PrizeModel