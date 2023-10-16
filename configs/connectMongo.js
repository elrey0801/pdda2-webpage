import mongoose from 'mongoose';
import User from '../models/user.js';
import WorkingElement from '../models/workingElement.js';

async function connectMongo() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to mongodb server");
            // const user = new User({ _id: 'root', password: 'root', name: 'root' });
            // user.save();
            
        })
        .catch(err => console.log(err))
}

export default connectMongo;