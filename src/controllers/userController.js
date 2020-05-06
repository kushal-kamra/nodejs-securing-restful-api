import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jwt';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized User!' });
    }
}

export const register = (req, res) => {
    const newUser = new User(req.body);

    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    
    newUser.save((err, user) => {
        if(err) {
            return res.status(400).send({ message: err });
        } else {
            user.password = undefined;
            return res.json(user);
        }
    });
}