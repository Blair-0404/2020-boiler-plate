# 2020-boiler-plate

- nodeJS, express설치 - 서버 개발환경 갖추기
* mongiDB연결 - mongoDB에 데이터들이 저장될 cluster생성 후 만든 서버와 연결해주기
    * mingoDB model & Schema 설정
* postman설치 - 서버로 rest api전송
* nodeman설치 - 서버 새로고침
* 개발환경에 따른 코드 보호(config directory생성)
    * mongoDB의 username, password 보호함
* bcrypt설치 - 받은 data중 password를 hash거쳐서 mongoDB에 저장

#### [회원가입 기능 - '/register' Router생성] POST

#### [로그인 기능 - '/login' Router생성] Post
    1. 요청된 이메일을 DB에 있는지 찾기
        - User model가져온후 mongoDB에서 제공하는 findOne method이용
        - findOne의 첫 인자는 찾고자 하는 email / 두번째인자는 역시 콜백함수(못찾으면 err, 찾으면 userInfo가져오기)
    2. 이메일이 있다면 비밀번호가 맞는 비밀번호인지 확인하기
        - User.js에 comparePassword 메소드를 생성해서 사용
        - hashedPW를 복호화할수 없으니 plainPW를 암호화해서 hashedPW와 같은지 확인해야 한다.
    3. 비밀번호까지 맞다면 username에 대한 토큰을 생성하기 (JSONWEBTOKEN라이브러리 다운)
        - User.js에 generateToke 메소드(토큰 생성 후 전달)를 생성해서 사용
        - 받아온 토큰 저장하기 - *쿠키* od 로컬스토리지
        - 쿠키로 저장 -> Cookiesparser모듈 사용
        
#### [인증기능 = '/Auth' Router생성] 
    -   page에 따라 인증이 필요한 경우를 위해서 필요한 기능
    - 
