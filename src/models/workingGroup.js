import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const workingGroupSchema = new Schema({
    element: [{
        type: Schema.Types.ObjectId,
        ref: 'WorkingElement'
    }],

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

let WorkingGroup = mongoose.model('WorkingGroup', workingGroupSchema);
export default WorkingGroup;