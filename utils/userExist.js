const User = require('../models/user');

const userExists = async (user)=>{
    if(user) await User.exists(user.id)    
}

module.exports = userExists;