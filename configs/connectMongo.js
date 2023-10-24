import mongoose from 'mongoose';
import User from '../models/user.js';
import WorkingElement from '../models/workingElement.js';
import bcrypt from 'bcrypt';

async function connectMongo() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to mongodb server");    
        })
        .catch(err => console.log(err))
    
    // var password = await bcrypt.hash('root', 12)
    // var user = new User({ username: 'root', password: password, name: 'root', activated: true });
    // user.save();
    // password = await bcrypt.hash('elrey', 12)
    // user = new User({ username: 'elrey', password: password, name: 'elrey', activated: true });
    // user.save();
}

export default connectMongo;