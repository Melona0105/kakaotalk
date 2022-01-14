// 들어오는 요청을 중간데 토큰해독해서 정보를 넘겨준다.
export async function auth(req, res) {
  const { token } = req.headers.authorization.split(" ")[1];
}
