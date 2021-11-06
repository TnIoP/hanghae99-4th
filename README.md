## 모두의 책리뷰
추천 도서를 공유하는 웹 사이트입니다.
베스트셀러와 유저가 직접 등록한 리뷰를 공유하고, 댓글 기능을 이용하여 유저들간 자유롭게 의견을 남길 수 있습니다.  

![모두의책](https://user-images.githubusercontent.com/78454645/140516769-f59631bd-55d0-4e6a-bb13-696f7eaeabeb.png)

## 웹사이트 링크
http://liamproject.shop/

## 시연영상
https://www.youtube.com/watch?v=F7ZPA0Mku0w


## 소개

* 프레임워크, 라이브러리에 의존하지 않고, vanilla-project 를 목표로 두었고, alert 대신 modal 중점으로 프로젝트 진행하였습니다.
* 여러가지 다양한 기능을 구현해보았습니다.

- Common
  상단에 nav-bar를 fixed 로 고정시켰습니다.
  대부분의 hover 에는 scale과 transition 기능을 부여하였습니다.
  로그인, 로그아웃(비로그인) 상황별로 부여된 기능이 다르게 하였습니다.
  ex) 로그인, 로그아웃시
  모든 pop-up 을 modal로 구현하였습니다.
  modal 창이 띄워질시 nav-bar를 제외한 뒷 배경 모든 기능 제거 및 투명도

- Main page
  접속시 첫 화면이며, 유저 추천 리스트 페이지입니다.
  유저가 등록한 URL을 크롤링하여 작은 박스에 소개박스, 클릭시 등록한 리뷰를 볼수 있는 모달 창
  모달 창 안에 삭제하기 기능
  
- Bestseller Page
  교보문고 사이트에서 1주일마다 업데이트되는 베스트셀러 20권을 실시간으로 크롤링 후 view
  박스 클릭시 모달창, 댓글 등록/삭제

- Sign-in Page
  입력한 값과 회원가입한 ID와 PW가 맞지 않을 시 error modal
  로그인 시에 2s delay 후 메인페이지로 이동

- Sign-up Page
  회원가입 박스에 zoom 기능을 부여했습니다.
  정규표현식 적용 / 실시간 아이디 중복, 패스워드 일치 불일치 여부 확인 기능 (예외처리)
  
  

## 기술 스택
- 개발 언어 : HTML5, CSS, javascript, python
- 개발 환경 : flask web framework
- 데이터베이스 : mongodb
- 형상관리 툴 : git
- Server : AWS EC2 (Ubuntu 18.04 LTS) 


## 요구 사항
### SSR vs CSR
- SSR은 한 번에 그려지는 장점, SEO에 강점
- CSR은 전체적인 시간은 SSR보다 비슷하거나 더 오래 걸릴 수도 있지만 로딩창을 먼저 보여줌으로써 사용자의 인내심을 늘려준다.

### JWT
- 발급 후 토큰 검증만 하면 되기 때문에 추가 저장소가 필요 없다. 가볍다.
- 필요한 모든 정보를 자체적으로 지니고 있기(self-contained)때문에 두 개체 사이에서 손쉽게 전달 될 수 있다.

