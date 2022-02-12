import mongoose from 'mongoose'

const Memo = new mongoose.Schema({
    title: String,
    message: String,
    tags: String,
    creator: String
})

export default mongoose.models.Memo || mongoose.model('Memo', Memo)