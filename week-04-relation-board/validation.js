module.exports = {
  signTest: (nickname, password, confirm) => {
    const sampleNickname = ["daniel", "coffee", "robot", "apple"]; // 임의의 닉네임 db

    for (let i = 0; i < sampleNickname.length; i++) {
      if (sampleNickname[i] === nickname) {
          console.log("중복된 닉네임입니다.")
          return false;
      }
    }

    if (!nickname || !password || !confirm) {
      return false;
    } else if (!/^[a-zA-Z0-9]{3,}$/.test(nickname)) {
      return false;
    } else if (password.length < 4) {
      return false;
    } else if (password !== confirm) {
      return false;
    } else if (password.search(nickname) > -1) {
      return false;
    }
    return true;
  },
};
