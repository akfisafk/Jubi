import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GuestSchema = new Schema({
    name: { type: String, required: true },
    id: { type: String },
    account: { type: String, required: true },
    expire_at: { type: Date, default: Date.now, expires: 1800 }
})

const Guest = mongoose.model('Guest', GuestSchema);

export default Guest;