import axios from "axios";

export async function handleLogin(email, password, callback) {
  try {
    const result = await axios({
      method: "POST",
      url: "http://localhost:4000/users/login",
      data: { email, password },
      withCredentials: true,
    });

    const { accessToken } = result.data;

    localStorage.setItem("token", accessToken);
    callback();
  } catch (err) {
    console.log("이메일 또는 비밀번호를 다시 확인해주세요.");
  }
}
