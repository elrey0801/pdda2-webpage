import mongoose from 'mongoose';

async function connectMongo() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to mongodb server");    
        })
        .catch(err => console.log(err))
}

export default connectMongo;