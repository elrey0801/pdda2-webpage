import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  activated: {
    type: Boolean,
    default: false
  }
});

// module.exports = mongoose.model('User', userSchema);
let User = mongoose.model('User', userSchema);
export default User;