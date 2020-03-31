const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type:String,
    maxlength:50
  },
  email: {
    type:String,
    trim:true,
    unique: 1
  },
  password: {
    type: String,
    minglength: 5
  },
  lastname: {
    type:String,
    maxlength: 50
  },
  role : {
    type:Number,
    default: 0
  },
  image: String,
  token : {
    type: String,
  },
  tokenExp :{
    type: Number
  }
});


const User = mongoose.model('User', userSchema);
// 스키마를 모델로 감싸기

module.exports = { User };
// 다른곳에서도 사용할수 있게