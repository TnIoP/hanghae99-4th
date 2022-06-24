const { signTest } = require('./validation');

test('닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 이루어져 있어야 합니다.', () => {
    expect(signTest("tT01", "1234", "1234")).toEqual(true); // 알파벳 대소문자, 숫자를 포함한 4자
    expect(signTest("t", "1234", "1234")).toEqual(false); // 알파벳 소문자 1자
    expect(signTest("@@@@", "1234", "1234")).toEqual(false); // 특수문자 4자
    expect(signTest("@", "1234", "1234")).toEqual(false); // 특수문자 1자
  });
  
  test("비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패합니다.", () => {
    expect(signTest("asdf", "1234", "1234")).toEqual(true); // 비밀번호 4자, 닉네임과 다른값
    expect(signTest("1234", "1234", "1234")).toEqual(false); // 비밀번호 4자, 닉네임과 같은 값이 포함
    expect(signTest("asdf", "123", "123")).toEqual(false); // 비밀번호 3자, 닉네임과 다른 값이 포함
  });
  
  test("비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다.", () => {
    expect(signTest("asdf", "1234", "1234")).toEqual(true); // 비밀번호 === 비밀번호확인
    expect(signTest("asdf", "1234", "12345")).toEqual(false); // 비밀번호 !== 비밀번호확인
    expect(signTest("asdf", "12345", "1234")).toEqual(false); // 비밀번호 !== 비밀번호확인
  });

  // 임의의 닉네임 db = ["daniel", "coffee", "robot", "apple"]
  test("데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 '중복된 닉네임입니다.' 라는 에러메세지가 발생합니다.", () => { 
    expect(signTest("asdf", "1234", "1234")).toEqual(true); // 중복되지 않은 닉네임
    expect(signTest("daniel", "1234", "1234")).toEqual(false); // 중복된 닉네임
    expect(signTest("apple", "1234", "1234")).toEqual(false); // 중복된 닉네임
  });
  
