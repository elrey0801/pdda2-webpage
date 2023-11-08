import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const opDataListSchema = new Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },

    elementList: [{
        type: String
    }]
});

let OPDataList = mongoose.model('OPDataList', opDataListSchema);
export default OPDataList;