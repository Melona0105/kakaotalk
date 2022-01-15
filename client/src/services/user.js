import Apis from "../apis"

const userService = {
  login: async (email, password) => {
    try {
      const accessToken = await Apis.users.login(email, password);
  
      // 받은 토큰을 로컬스토리지에 저장한다.
      localStorage.setItem("token", accessToken);
    } catch (err) {
      localStorage.setItem("token", "");
      throw err;
    }
  }
}

export default userService;
