const User = require("../models/userSchema")
const { v4: uuidv4 } = require('uuid');

const createUserAddress = async (req,res) => {
    const {userId} = req.params
    const token = uuidv4()
    const {buildingRoom,societyApartment,roadNearby,town,city,pinCode} = req.body
    const user = await User.findByIdAndUpdate(userId,{$push: {address: {token,buildingRoom,societyApartment,roadNearby,town,city,pinCode}}},{new: true})
    try {
        if(user){
            const selectedAddress = await User.findByIdAndUpdate(userId, {$set: {selectedAddress: {token,buildingRoom,societyApartment,roadNearby,town,city,pinCode}}},{new: true})
            return res.status(200).json({message: "Address added",selectedAddress: selectedAddress.selectedAddress,address: selectedAddress.address})
        }else{
            return res.status(400).json({error: "something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const updateUserAddress = async (req,res) => {
    const {userId} = req.params
    const {token,buildingRoom,societyApartment,roadNearby,town,city,pinCode} = req.body
    const user = await User.findById(userId)
    const userAddress = user.address.find(elem => elem.token === token)
    try {
        if(userAddress){
            const updateAddress = await User.findOneAndUpdate({_id: userId,"address.token":token},{$set: {"address.$.buildingRoom":buildingRoom,"address.$.societyApartment":societyApartment,"address.$.roadNearby":roadNearby,"address.$.town":town,"address.$.city":city,"address.$.pinCode":pinCode}},{new: true})
            if(user.selectedAddress.token === token){
                const updateSelectedAddress = await User.findByIdAndUpdate(userId, {$set: {selectedAddress: {token,buildingRoom,societyApartment,roadNearby,town,city,pinCode}}},{new: true})
                return res.status(200).json({message: "Address updated",selectedAddress: updateSelectedAddress.selectedAddress,address: updateSelectedAddress.address})
            }else{
                return res.status(200).json({message: "Address updated",selectedAddress: updateAddress.selectedAddress,address: updateAddress.address})
            }
        }else{
            return res.status(400).json({error: "something went wrong or address not found"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const removeUserAddress = async (req,res) => {
    const {userId} = req.params
    const {token} = req.body
    const removeAddress = await User.findByIdAndUpdate(userId,{$pull: {address: {token: token}}},{new: true})
    try {
        if(removeAddress){
            if(removeAddress.selectedAddress.token === token){
                const removeSelectedAddress = await User.findByIdAndUpdate(userId, {$set: {selectedAddress: {}}},{new: true})
                return res.status(200).json({message:"Address Removed",selectedAddress: removeSelectedAddress.selectedAddress,address: removeSelectedAddress.address})
            }else{
                return res.status(200).json({message:"Address Removed",selectedAddress: removeAddress.selectedAddress,address: removeAddress.address})
            }
        }else{
            return res.status(400).json({error: "something went wrong"})
        }
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const setUserDefaultAddress = async (req,res) => {
    const {userId} = req.params
    const {token,buildingRoom,societyApartment,roadNearby,town,city,pinCode} = req.body
    try {
        const updateSelectedAddress = await User.findByIdAndUpdate(userId, {$set: {selectedAddress: {token,buildingRoom,societyApartment,roadNearby,town,city,pinCode}}},{new: true})
        return res.status(200).json({message: "Address updated",selectedAddress: updateSelectedAddress.selectedAddress})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

module.exports.createUserAddress = createUserAddress
module.exports.updateUserAddress = updateUserAddress
module.exports.removeUserAddress = removeUserAddress
module.exports.setUserDefaultAddress = setUserDefaultAddress