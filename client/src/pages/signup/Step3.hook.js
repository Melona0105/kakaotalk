import { useEffect, useState } from "react";

function useStep3() {
  const [isPasswordFill, setIsPasswordFill] = useState(false);
  const [isConfirmPasswordFill, setIsConfirmPasswordFill] = useState(false);
  const [password, setPassword] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordConfirm, setPasswordConfrim] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  function checkValidPassword(input) {
    setInputPassword(input);
    setIsPasswordError(false);
    let num = input.search(/[0-9]/g);
    let eng = input.search(/[a-z]/g);
    let spe = input.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/g);

    if (input.length < 8 || input.length > 32) {
      setIsPasswordError(true);
    } else if (input.search(/\s/) !== -1) {
      setIsPasswordError(true);
    } else if (num < 0 || eng < 0 || spe < 0) {
      setIsPasswordError(true);
    } else {
      setPassword(input);
    }
  }

  useEffect(() => {
    if (password && passwordConfirm && password === passwordConfirm) {
      setIsPasswordConfirm(true);
    } else {
      setIsPasswordConfirm(false);
    }
    if (inputPassword.length) {
      setIsPasswordFill(true);
    } else {
      setIsPasswordFill(false);
    }
    if (passwordConfirm.length) {
      setIsConfirmPasswordFill(true);
    } else {
      setIsConfirmPasswordFill(false);
    }
  }, [password, passwordConfirm, inputPassword]);

  return {
    models: {
      inputPassword,
      isPasswordError,
      passwordConfirm,
      isConfirmPasswordFill,
      isPasswordConfirm,
      password,
      isPasswordFill,
    },
    operations: {
      checkValidPassword,
      setInputPassword,
      setPassword,
      setIsPasswordError,
      setPasswordConfrim,
    },
  };
}

export default useStep3;
