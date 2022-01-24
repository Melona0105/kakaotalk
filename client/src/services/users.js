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

  fetchUserInfo: async () => {
    try {
      return await Apis.users.getUserInfo();
    } catch (err) {
      throw err;
    }
  },

  fetchFriends: async (currentStatus, callback) => {
    try {
      const result = await Apis.users.getFriends();
      if (callback) {
        callback(result.filter((el) => el.status === currentStatus));
      } else {
        return result;
      }
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
};

export default userService;
