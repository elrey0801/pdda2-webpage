import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ptvhSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  note: [{
      type: String,
      default: null
    }]
});

let PTVH = mongoose.model('PTVH', ptvhSchema);
export default PTVH;