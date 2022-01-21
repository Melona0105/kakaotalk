import Apis from "../apis";

const userService = {
  login: async (email, password) => {
    try {
      const accessToken = await Apis.users.login(email, password);

      // 받은 토큰을 로컬스토리지에 저장한다.
      localStorage.setItem("token", accessToken);
    } catch (err) {
      localStorage.removeItem("token");
      throw err;
    }
  },

  checkEmail: async (email) => {
    try {
      const result = await Apis.users.checkEmail(email);

      if (result.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },

  userInfo: async () => {
    try {
      return await Apis.users.userInfo();
    } catch (err) {
      throw err;
    }
  },

  getFriends: async () => {
    try {
      return await Apis.users.getFriends();
    } catch (err) {
      throw err;
    }
  },

  getRooms: async () => {
    try {
      return await Apis.users.getRooms();
    } catch (err) {
      throw err;
    }
  },

  // signUp: async ({ email, username, password, userbirth, agreements }) => {
  //   try {
  //     const result = await Apis.users
  //       .signUp(email, username, password, userbirth, agreements)
  //       .then(async () => {
  //         await Apis.users.login(email, password);
  //       });
  //   } catch (err) {
  //     throw err;
  //   }
  // },
};

export default userService;
