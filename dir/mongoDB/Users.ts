import mongoose from 'mongoose'

const User = new mongoose.Schema({
    phoneNumber: String,
})

export default mongoose.models.User || mongoose.model('User', User)