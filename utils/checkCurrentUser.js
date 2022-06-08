
const userValid ="test@koibanx.com"
const pswValid ="test123"    

const checkCurrentUser = (usr)=> {
    if(usr.username.toLowerCase()==userValid.toLowerCase() && usr.password.toLowerCase()==pswValid.toLowerCase()) return true;
    }

module.exports = checkCurrentUser;