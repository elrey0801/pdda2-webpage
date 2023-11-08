import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const opDataSchema = new Schema({
    date: {
        type: Date,
    },
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
});

opDataSchema.index({ date: 1, name: 1 }, { unique: true });

// module.exports = mongoose.model('User', userSchema);
let OPData = mongoose.model('OPData', opDataSchema);

export default OPData;