import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
 password: {
    type: String,
    required: true,
  },
  date: 
  { 
    type: Date, 
    default: Date.now,
  },
  isAdmin: 
  { 
    type: Boolean, 
    default: false,
  },
  // avatar: {
  //   type: String, 
  //   default: '', 
  // },
})




export default mongoose.model('User', userSchema);