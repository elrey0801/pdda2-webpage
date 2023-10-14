import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

// module.exports = mongoose.model('User', userSchema);
export default User = mongoose.model('User', userSchema);
