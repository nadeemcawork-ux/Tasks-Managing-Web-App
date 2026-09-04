const User = require('../models/User')
const generateToken = require('../utils/generateToken')

const registerUser = async (req, res) => {

    try{

        const {name, email, password} = req.body
        
        if(!name || !email || !password){

            return res.status(400).json({message: "Please enter all the fields"})
        }

        const existinguser = await User.findOne({email})

        if(existinguser)
            return res.status(400).json({message: "A user with this email already exists"})

        const user = await User.create({name, email, password})

        const token = generateToken(user._id)

        return res.status(200).json({
            
            message: "User registered successfully", 
            token, 
            user: {

                id: user._id,
                name: user.name,
                email: user.email
            }
        })


    }catch(error){

        res.status(500).json({message: 'Server error', error: error.message})

    }
}

const login = async (req, res) => {

    try{

    const {email, password} = req.body

    if(!email || !password)
        return res.status(400).json({message: "Please enter all the fields"})

    const user = await User.findOne({email}).select("+password")
    if(!user)
        return res.status(400).json({message: "Invalid credentials"})

    const isMatch = await user.matchPassword(password)
    if(!isMatch)
        return res.status(400).json({message: "Invalid credentials"})

    const token = generateToken(user._id)

    return res.status(200).json({message: "Login successful" , 
                                 token,
                                 user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                 }
                                })

}catch(error){

    res.status(500).json({message: 'Server error', error: error.message})

}

}

module.exports = {registerUser, login}