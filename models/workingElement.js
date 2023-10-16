import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const workingElementSchema = new Schema({
    groupID: {
        type: String,
        require: true
    },
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
    },
    creator: {
        type: Object,
        required: String
    }
});

let WorkingElement = mongoose.model('WorkingElement', workingElementSchema);
export default WorkingElement;