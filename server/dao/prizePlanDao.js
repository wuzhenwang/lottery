const PrizePlan = require('../model/prizePlanModel')

const prizePlanDao = {
    findAll: async (state) => {
        if (state) {
            let list = await PrizePlan.findAll({where:{state:1}})
            return list;
        } else {
            let list = await PrizePlan.findAll(
                // 放开注释，即为忽略软删除的数据；paranoid: false
                // {paranoid: false}
            )
            // // 写sql
            // UserModel.query(`
            //     select username, sex from user
            // `)
            return list
        }
    },
    delete: async (id) => {
        let result = await PrizePlan.destroy({
            where: {
                id: id
            }
        });
        return result;
    },
    restore: async (id) => {
        let result = await PrizePlan.restore({
            where: {
                id: id
            }
        });
        return result;
    },
    create: async (plan) => {
        let result = PrizePlan.create(plan);
            // .then(data => {
            //     res.send(data);
            //   })
            // .catch(err => {
            //     res.status(500).send({
            //         message:
            //             err.message || "创建清单是发生错误。"
            //     });
            // });
        return result;
    }

}

module.exports = prizePlanDao



