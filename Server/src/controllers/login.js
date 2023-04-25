const users = require('../utils/users')

const login = (req,res) => {
    const { email, password } = req.query;

    const userFound = users.find((user) => user.email === email && user.password === password) //comparo el email y pass que recibo por query contra el arreglo de usarios de users que importo de utils, la lista d etodos los usuarios
    
    return userFound
    ? res.status(200).json({access: true}) 
    : res.status(404).json({access: false})

    // if(userFound) return res.status(200).json({access: true})   //otra manera de controlar
    // return res.status(404).json({access: false})
}

module.exports = {
    login
};