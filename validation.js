module.exports = {
    signTest: ( nickname, password, confirm ) => {
  
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