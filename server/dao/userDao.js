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

}

module.exports = userDao



