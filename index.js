// 서버생성

const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

// 정보보호 환경변수 설정한 코드 가져오기 위해
const config = require('./config/key');

// User.js에서 스키마, 메소드 가져오기 위해
const {User} = require("./models/User");

//application/x-www-form-urlencoded를 분석해서 가져오게함
app.use(bodyParser.urlencoded({extended: true}));

//application/json을 분석해서 가져오게 함
app.use(bodyParser.json());

const mongoose = require('mongoose');


//어떠한 개발환경(로컬?배포?)인지에 따라 mongoDB id,비번 보호하는 코드위치(local파일?HEROKU?)를 알기 위해 config.mongoURI 연결
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MonggoDB Connected...'))
  .catch(err => console.log(err));


app.get('/', (req, res) => res.send('Hello 수정이 바로 반영??'));


// '/registe' 즉 회원가입 위한 라우터 생성 (회원가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.)
app.post('/register', (req, res) => {

  //정보들을 DB에 넣기
  const user = new User(req.body);

  //Bcrypt다운 후 비밀번호 암호화하기(mongoose기능 이용) :  postman -> DB보낸 데이터중 비밀번호는 암호화해서 저장하기(보안성을 위해서)
  // .save()를 하기전에 비번 암호화를 해야한다.

  // save()는 mongoDB의 메소드로 정보들이 user model에 저장이 된다.(내부인자는 콜백함수)
  user.save((err, userinfo) => {
    // 저장시 에러있다면 client에 에러있음을 json 형식으로 전달 {success:false, err(에러메세지)} 내용으로
    if (err) return res.json({success: false, err});
    // 성공이라면 성공했음을 json 형식으로 전달 (status(200).는 성공의미)
    return res.status(200).json({
      success: true
    })
  })
});
// 라우터 생성 후 postman이용해서 회원가입 시도해봄(1.npm run start)


// 로그인 기능 라우터 생성
// 1.사용자가 email입력시(요청시) DB에서 정보 찾기 2.비번 맞는지 확인 3.토큰생성하기
app.post('./login', (req, res) => {

  // 1. 요청된 이메일을 DB에 있는지 찾기
  // User model가져온후 mongoDB에서 제공하는 findOne method이용
  // findOne의 첫 인자는 찾고자 하는 email / 두번째인자는 역시 콜백함수(못찾으면 err, 찾으면 userInfo가져오기)
  User.findOne({email:req.body.email}, (err,user) => {
    if(!user) {
      return res.json({
        loginSuccess:false,
        message:"제공된 이메일에 해달하는 유저가 없습니다."
      })
    }

    // 이메일이 있다면 비밀번호가 맞는 비밀번호인지 확인하기 (User.js에 comparePassword 메소드를 생성해서 사용)
    // (req.body.password = plainPW)
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({loginSuccess: false, message: "PW가 틀렸습니다."});

      // 비밀번호까지 맞다면 토큰을 생성하기 (User.js에 generateToke 메소드를 생성해서 사용)
      user.generateToken((err, user) => {

      })
    })
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));