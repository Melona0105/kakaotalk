import axios from "axios";

export async function handleSignup(userInfo, setIsLogin) {
  const { email, username, password, userBirth, agreements } = userInfo;
  try {
    const result = await axios({
      method: "POST",
      url: "http://localhost:4000/users/signup",
      withCredentials: true,
      data: { email, username, password, userBirth, agreements },
    }).catch((err) => {
      const { status } = err.response;
      if (status === 401) {
        console.log("이미 가입된 계정입니다.");
      }
    });
    // 현재 입력한 것들로 로그인시켜주기
  } catch (err) {
    console.log("서버 에러가 발생했습니다.");
  }
}
