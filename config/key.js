//mongoDB id,비번은 깃허브에 올라가지 않도록 보호하기(2가지 환경변수 있음)
// process.env.NODE_ENV = 정보보호의 환경변수설정 (local환경인지 deploy환경인지)

// local로컬환경(development모드)-->dex.js파일 VS Deploy배포환경(propdection모드)-->prod.js파일
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
