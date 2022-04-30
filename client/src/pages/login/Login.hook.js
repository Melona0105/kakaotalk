import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleIsLogin, handleLoadingOn } from "../../actions";
import Service from "../../services";

function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);
  const [isInputFill, setIsInputFill] = useState(false);
  const dispatch = useDispatch();

  async function handleLogin(email, password, callback) {
    setIsLoginError(false);
    dispatch(handleLoadingOn(true));

    try {
      await Service.users.login(email, password);
      callback();
    } catch (err) {
      setIsLoginError(true);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  const inputs = [
    {
      type: "text",
      initView: "카카오계정(이메일)",
      content: email,
      callback: setEmail,
    },
    {
      type: "password",
      initView: "비밀번호",
      content: password,
      callback: setPassword,
    },
  ];

  function enterLogin() {
    handleLogin(email, password, () => {
      dispatch(handleIsLogin(true));
    });
  }

  // 입력된 값이 있으면, 버튼 활성화시키기
  useEffect(() => {
    email.length >= 3 && password.length >= 3
      ? setIsInputFill(true)
      : setIsInputFill(false);
  }, [email, password]);

  return {
    models: { inputs, isInputFill, email, password, isLoginError },
    operations: { enterLogin },
  };
}

export default useLogin;
