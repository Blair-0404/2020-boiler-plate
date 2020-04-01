const mongoose = require('mongoose');

//비밀번호 암호화를 위해 bcrypt 불러오기(사용법 1.자릿 수 정하고 salt생성 2. 생성된 salt로 비번암호화시키)
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minglength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number
  }
});

// .pre('') = mongoose에서 가져온 method
// 첫번쨰 인자인 save하기 전에 두번째인자 함수를 먼저 실행
userSchema.pre('save', function (next) {

  let user = this;   // user-> userSchema자체를 가르킴

  // 다른 정보를 변경하는 굳이 password hash화를 다시 할 필요가 없으므로 조건문을 걸어서 필요시에만 password hash 실행하게 해주기
  if (user.isModified('password')) {

    //bcrypt.genSalt로 salt생성(첫인자 자릿수 두번째인자 콜백함수)
    bcrypt.genSalt(saltRounds, function (err, salt) {

      //에러나면 바로 다음 실행 next 즉 index.js의 user.save(err)실행하기
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;  // user.password를 hash된 비번으로 바꿔준다.
        next() // 비번 hash완성되면 다음단계로
      })
    });

    //다른 정보를 바꿀때는 next() 를 해주지 않으면 userSchema.pre에서 빠져나오지 못하게 된다.
  } else {
    next()
  }
});

// 비밀번호 비교 함수 생성하기 (함수명은 암의로 설정! 대신 사용할때 이 이름으로 사용할것indes.js에서 아용)
// ex) plainPW : 1234 -> hashedPW : %#4dkljfs% 일떄  1234와 %#4dkljfs%가 같은지 체크해야함
// hashedPW를 복호화할수 없으니 plainPW를 암호화해서 hashedPW와 같은지 확인해야 한다.
userSchema.methods.comparePassword = function(plainPassword, callbackFunc) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return callbackFunc(err),
      callbackFunc(null, isMatch)
  })
};

userSchema.methods.generateToken = function(cb) {
  // jsinwebtoken을 이용해서 토큰 생성하기

  var user = this;

  // user._id는 mongoDB에 받은 데이터의_id 의미
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  // 위 코드는 이처럼 실행되고 user._id + 'secretToken' = token
  // 'secretToken'만으로 그 유저의 user_id가 뭔지 알 수 있게된다.

  user.token = token; // 위에서 만든 토큰 넣어주기
  user.save(function(err, user) {
    if(err) return cb(err); // 에러있다면 콜백으로 에러 전달
    cb(null, user) // save가 잘 됬을시에는 에러는 없고 user정보만 전달
  })
};


const User = mongoose.model('User', userSchema);
// 스키마를 모델로 감싸기

module.exports = {User};
// 다른곳에서도 사용할수 있게 내보내기