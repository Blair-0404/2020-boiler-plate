// 배포(Deploy)환경일때는 HEROKU사이트에 보호코드 넣어주기
module.exports = {
  // 아래 MONGO_URI 부분은 HEROKU사이트에서 Config Vars와 같게 해주어야 한다.
  mongoURI: precess.env.MONGO_URI
};