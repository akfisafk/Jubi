import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    account: { type: String, required: true},
    id: { type: String },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Favorite'
        }
    ]
})

const User = mongoose.model('User', UserSchema);

export default User;