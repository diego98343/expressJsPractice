
const BadRequestError = require('../errors/custom-error');

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
   
  res.status(200).json({
    msg: `Hello`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

const login = async (req, res) => {

    const { username, password } = req.body
    

    if (!username || !password) {
    throw new BadRequestError('Please provide email and password')
  }

    
    res.send('jejejjejej');
}


module.exports = {
    login, dashboard
}