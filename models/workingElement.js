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
    element: {
        type: String,
        default: null,
    },
    station: {
        type: String,
        default: null,
    },
    ptt: {
        type: String,
        default: null,
    },
    actualStart: {
        type: Date,
        default: null
    },
    actualFinish: {
        type: Date,
        default: null
    }
});

let WorkingElement = mongoose.model('WorkingElement', workingElementSchema);
export default WorkingElement;