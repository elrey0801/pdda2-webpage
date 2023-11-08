import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const opDataSchema = new Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    data: [{
        name: {
            type: String
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