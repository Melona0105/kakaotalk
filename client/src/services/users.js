import Apis from "../apis";

const userService = {
  login: async (email, password) => {
    try {
      const accessToken = await Apis.users.login(email, password);
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

  fetchUserInfo: async () => {
    try {
      return await Apis.users.getUserInfo();
    } catch (err) {
      throw err;
    }
  },

  fetchFriends: async () => {
    try {
      const result = await Apis.users.getFriends();
      return result;
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

  updateUsername: async (username) => {
    try {
      await Apis.users.editUsername(username);
    } catch (err) {
      throw err;
    }
  },

  updateUserPhoto: async (photo) => {
    try {
      await Apis.users.editUserphoto(photo);
    } catch (err) {
      throw err;
    }
  },

  signup: async (userInfo, callBack) => {
    try {
      await Apis.users.signup(userInfo);
      await userService.login(userInfo.email, userInfo.password);
      callBack();
    } catch (err) {
      throw err;
    }
  },
};

export default userService;
