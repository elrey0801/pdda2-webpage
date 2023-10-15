import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const workingElementSchema = new Schema({
    scheduleStart: {
        type: Date,
        default: null
    },
    scheduleFinish: {
        type: Date,
        default: null
    },
    crew: {
        type: String,
        default: null,
    },
    content: {
        type: String,
        default: null,
    },
});

// module.exports = mongoose.model('User', userSchema);
let WorkingElement = mongoose.model('WorkingElement', workingElementSchema);
export default WorkingElement;