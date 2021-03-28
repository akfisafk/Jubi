import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Guest from '../models/guest.js';
import Favorite from '../models/favorites.js';

import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.SECRET;


export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: user.email, id: user._id, account: user.account }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: user, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const guest = async (req, res) => {
    const { name } = req.body;

    try {
        const result = await Guest.create({ name: name, account: 'guest' });

        const token = jwt.sign({ id: result._id, account: result.account }, secret, { expiresIn: ".5h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ messsage: 'Something went wrong' });

        console.log(error);
    }
}

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email: email, password: hashedPassword, name: name, account: 'user' });

        const token = jwt.sign({ email: result.email, id: result._id, account: result.account }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

export const createFavorite = async (req, res) => {
    let { original_title, poster_path, overview, genre_ids, id, movie_id } = await req.body;

    // Get user who is favoriting something
    const user = await User.findById(id);

    for (let favorite of user.favorites) {
        const fav = await Favorite.findById(favorite);
        if (fav) {
            console.log(await fav)
            if (fav.original_title == original_title) {
                console.log(favorite) // the id of the _id in the users favorites
                await User.findByIdAndUpdate(id, { $pull: { favorites: favorite } });
                console.log('Succesfully removed from users favorites');
                await Favorite.findByIdAndDelete(favorite);
                console.log('Successfully removed from favorites database');
                original_title = null;
            }
        }
    };

    if (original_title) {
        const favorite = new Favorite({ original_title, poster_path, overview, genre_ids, movie_id });
        
        console.log(favorite);

        favorite.author = id;

        user.favorites.push(favorite);

        await favorite.save();

        await user.save();

        console.log(id + ' is favoriting ' + original_title);
    }
};

export const getFavorites = async (req, res) => {
    console.log('GET received favorites request');

    const { id } = req.params;

    // console.log(id);

    const user = await User.findById(id);

    const favorites = user.favorites;

    let favoriteList = [];

    for (let favorite of favorites) {
        const foundFavorite = await Favorite.findById(favorite);
        favoriteList.push(foundFavorite);
    }

    // console.log(favoriteList);

    res.send(favoriteList);
}

export const namechange = async (req, res) => {
    console.log('Someone is changing their name');

    const { formData, id } = req.body;
    const name = formData.name


    try {
        const user = await User.findOne({ _id: id });

        if (!user) return res.status(404).json({ message: "User doesn't exist" });

        user.name = name;

        await user.save();

        console.log('Name updated -- save complete')

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: user, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }

}

export const passwordchange = async (req, res) => {
    console.log('Someone is changing their password');

    const { formData, id } = req.body;
    const confirmPassword = formData.confirmPassword;
    const newPassword = formData.newPassword;

    try {
        console.log('attempting password change')

        const user = await User.findOne({ _id: id });

        if (!user) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(confirmPassword, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        user.password = hashedPassword;

        await user.save();

        console.log('Password updated -- save complete')

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: user, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }

}