const Prize = require('../model/prizeModel')

const prizeDao = {
    findAll: async (id) => {
        let list = await Prize.findAll({where: {plan_id:id},order:['type']});
        return list;
    },
    delete: async (id) => {
        let result = await Prize.destroy({
            where: {
                id: id
            }
        });
        return result;
    },
    restore: async (id) => {
        let result = await Prize.restore({
            where: {
                id: id
            }
        });
        return result;
    },
    create: async (plan) => {
        let result = Prize.create(plan);
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
    },
    update: async (id, imgSrc) => {
        let result = Prize.update(
            {img: imgSrc},
            {where: {
                id: id
                }}
        );
        return result;
    }

}

module.exports = prizeDao



