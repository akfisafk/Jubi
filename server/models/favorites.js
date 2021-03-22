import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    original_title: String,
    poster_path: String,
    overview: String,
    genre_ids: Array,
    movie_id: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Favorite = mongoose.model('Favorite', FavoriteSchema);

export default Favorite;