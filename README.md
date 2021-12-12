# TOGETHER
개발 스터디 모임을 위한 서비스 

![together](https://user-images.githubusercontent.com/89950049/145661794-8a84f379-ab63-4d30-b8f7-6eea9118dc75.png)

- http://w6miniproject99.s3-website.ap-northeast-2.amazonaws.com/
## 1. 제작 기간 & 백엔드 팀원 소개

- 2021/12/06 ~ 2021/12/11
- 5조 팀 프로젝트 백엔드 팀원
  - 김태우, 민수현, 이동호

- 5조 팀 프로젝트 프론트엔드 팀원
  - 박서담, 정민경

## 2. 사용 기술

- `Backend`
   - 개발언어 : Node.js
   - 웹프레임워크 : Express
   - 암호화 : jsonwebtoken
   - API 문서화 : swagger
   - MongoDB 데이터 모델링 : Mongoose
   - Request Resource 제한 : Cors
- `DB`
   - MongoDB


## 3. 노션 설계 페이지 & WireFrame & API

- 프로젝트 회의록
  - https://climbing-law-501.notion.site/128814132923439b81265970a2e4885c
- Swagger UI API  
  - http://13.124.187.20/swagger/

## 4. 투게더 사이트 시연 영상
https://www.youtube.com/watch?v=UyiIcpVmVmE
--------------


## 5. 핵심기능

- 로그인, 회원가입
   - JWT를 이용하여 로그인과 회원가입을 구현하였습니다.
   - 아이디는 이메일 형식으로 구성해야 합니다. ex) email@email.com
   - 비밀번호는 숫자,영문자 소/대문자로 구성해야 합니다.
   - 닉네임을 이미 사용 중이면 회원가입이 불가능합니다.

- 마이 페이지 
   - 마이 페이지 조회하기
   - 내가 모집한 글과 다른 글에 참여한 리스트에 따로 보여지도록 구현했습니다.
   - 닉네임, 비밀번호 수정할 수 있습니다.
   - 닉네임이 존재하는 닉네임과 중복될 경우 수정이 불가능합니다.
   - 마이페이지에서 내가 쓴 글에 수정, 삭제가 가능합니다.


- 스터디 모집 게시판 리스트 CRUD
   - 게시글 좌측 상단에 모집하기를 눌러, 모집 게시글 작성이 가능합니다.
   - 스터디 참여 버튼을 눌러 모집에 참여할 수 있고, 모집인원이 다 찼을 경우에 모집마감이 됩니다.
   - 다른 유저의 게시글을 조회할 수 있습니다.
   - 토큰 인증을 통해서 자신의 글만 수정, 삭제가 가능합니다.

