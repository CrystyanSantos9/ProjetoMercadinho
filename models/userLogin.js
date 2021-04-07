const { selectOneUserLogin } = require("../db/db")

module.exports =async ()=>{
    const user = await selectOneUserLogin()
    return user 
}