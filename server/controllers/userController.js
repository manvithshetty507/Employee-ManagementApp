const User = require('../models/User');
const bcrypt = require('bcrypt');


const createUser = async (req, res) => {
    const reqUser = req.body
}

const getUser = async (req, res) => {
    
    console.log("GET method of USER as been invoked with request body | ", req.body)

    const {username, password} = req.body;
    try{
        const userFromDb = await User.findOne({username});

        if(!userFromDb) {
            console.log("REQUEST USER IS NOT FOUND IN DB |", username);
            return res.status(401).json({"msg":"Invalid username or password"});
        }

        const isMatch = await bcrypt.compare(password, userFromDb.password);

        if(!isMatch) {
            console.log("PASSWORD DOESNT MATCH FOR USER | ", username);
            return res.status(401).json({"msg":"Invalid username or password"});
        }

        console.log("USER IS VALID | ", username);
        res.status(200).json({ message: 'Login successful' });
    }catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { createUser, getUser }