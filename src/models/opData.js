import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const opDataSchema = new Schema({
    element: {
        type: String,
        required: true
    },
    data: [{
        date: {
            type: Date
        },
        i: [{
            type: Number
        }],
        p: [{
            type: Number
        }],
        q: [{
            type: Number
        }]
    }]
});

// module.exports = mongoose.model('User', userSchema);
let OPData = mongoose.model('OPData', opDataSchema);
export default OPData;