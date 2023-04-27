const userDao = require('../dao/userDao')

const userService = {
    getUserListService: async () => {
        let userList = await userDao.getUserListDao()
        return userList
    },
    delUserService: async (id) => {
        let result = await userDao.delUserDao(id);
        return result;
    },
    restore: async (id) => {
        let result = await userDao.restore(id);
        return result;
    }
}

module.exports = userService