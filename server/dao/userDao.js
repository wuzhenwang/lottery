const UserModel = require('../model/userModel')

const userDao = {
    getUserListDao: async () => {
        let userList = await UserModel.findAll(
            // 放开注释，即为忽略软删除的数据；paranoid: false
            // {paranoid: false}
        )
        // // 写sql
        // UserModel.query(`
        //     select username, sex from user
        // `)
        return userList
    },
    delUserDao: async (id) => {
        let result = await UserModel.destroy({
            where: {
                id: id
            }
        });
        return result;
    },
    restore: async (id) => {
        let result = await UserModel.restore({
            where: {
                id: id
            }
        });
        return result;
    },
    create: async (user) => {
        let result = UserModel.create(user);
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

module.exports = userDao



