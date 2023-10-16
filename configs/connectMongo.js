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
    
    // let password = await bcrypt.hash('root', 12)
    // const user = new User({ _id: 'root', password: password, name: 'root' });
    // user.save();
    const work = new WorkingElement({groupID: '10', creator: 'root'});
    work.save();
}

export default connectMongo;