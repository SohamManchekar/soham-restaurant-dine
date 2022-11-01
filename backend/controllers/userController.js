const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSignup = async (req,res) => {
    const {firstName,lastName,email,password} = req.body

    let existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(422).json({error:"Email ID already in use"})
    }else{
        const encryptedPassword = bcrypt.hashSync(password)
        const user = new User({firstName,lastName,email,password: encryptedPassword})
        try {
            await user.save()
        } catch (error) {
            return res.status(404).json({error: error.message})
        }
        return res.status(201).json({user})
    }
}

const userLogin = async(req,res) => {
    const {email,password} = req.body
    let existingUser
    try {
        existingUser = await User.findOne({email})
        if(existingUser){
            const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
            const token = jwt.sign({id: existingUser.id},process.env.SECRET_KEY,{
                expiresIn : "30d"
            })
    
            if(isPasswordCorrect){
                res.cookie("token",token,{
                    path: "/",
                    sameSite:"lax",
                    expires: new Date(Date.now() + 2600000000),
                    httpOnly: true
                })
                let user = {name: existingUser.firstName+" "+existingUser.lastName,email: existingUser.email,isAdmin: existingUser.isAdmin,userId: existingUser._id}
                return res.status(200).json({user,token:token,selectedAddress: existingUser.selectedAddress})
            }else{
                return res.status(400).json({error: "Password incorrect"})
            }
        }else{
            return res.status(404).json({error: "User not found"})
        }
    } catch (error) {
            return res.status(400).json({error: error.message})
    }
}

const authentication = async(req,res,next) => {
    const cookies = req.headers.cookie
    const token = cookies.split("=")[1]
    try {
            if(token){
                jwt.verify(String(token),process.env.SECRET_KEY, (err,user) => {
                    if(err){
                        return res.status(400).json({error: err.message})
                    }
                    req.id = user.id
                })
                next();
            }else{
                return res.status(404).json({error: "token not found"})
            }
        }
     catch (error) {
            return res.status(400).json({error: error.message})
    }
}

const userLogout = async(req,res) =>{
    const {token} = req.body
    try {
        if(token){
            jwt.verify(String(token),process.env.SECRET_KEY, (err,user) => {
                if(err){
                    res.clearCookie("token")
                    req.cookies['token'] = "";
                    return res.status(400).json({error: err.message})
                }
                res.clearCookie("token")
                req.cookies['token'] = "";
                res.status(200).json({message:'logout'})
            })
        }else{
            return res.status(404).json({error:"token not found"})
        }
    } catch (error) {
        res.clearCookie("token")
        req.cookies['token'] = "";
        return res.status(400).json({error: error.message})
    }
}

const userData = async (req,res) => {
    const {id} = req.params
    const user = await User.findById(id)
    try {
        if(user){
            return res.status(200).json({cart: user.cart,orders: user.orders,addresses: user.address,selectedAddress: user.selectedAddress})
        }else{
            return res.status(400).json({error: "User not found"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports.userSignup = userSignup
module.exports.userLogin = userLogin
module.exports.userLogout = userLogout
module.exports.authentication = authentication
module.exports.userData = userData