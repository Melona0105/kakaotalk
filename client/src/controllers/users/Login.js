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
    callback(true);
  } catch (err) {
    console.log("데이터베이스에 이메일이 없습니다.");
  }
}
