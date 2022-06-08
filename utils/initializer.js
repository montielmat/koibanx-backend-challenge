const User = require('../models/userSchema')
const logger = require('../utils/logger')


const init = async function () {
    if (await User.countDocuments({"username": "test@koibanx.com"})) {
        return
    }
    let user = new User();
    let currentUser = null
    user.username = "test@koibanx.com";
    user.password = "admin";
    currentUser = await User.create(user);
    logger.info("Test User created")
}

module.exports = {init,currentUser}