import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleLoadingOn } from "../../actions";
import Service from "../../services";

function useStep4(currentUserInfo) {
  const [userBirth, setUserBirth] = useState(undefined);
  const [isNameFill, setIsNameFill] = useState(false);
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState({ ...currentUserInfo });
  const radioData = [
    { value: "male", title: "남성" },
    { value: "female", title: "여성" },
    { value: "none", title: "선택안함" },
  ];
  const dispatch = useDispatch();

  async function handleSignup(userInfo, callBack) {
    dispatch(handleLoadingOn(true));
    try {
      await Service.users.signup(userInfo, callBack);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  useEffect(() => {
    username.length ? setIsNameFill(true) : setIsNameFill(false);
  }, [username]);

  useEffect(() => {
    setUserInfo({ ...currentUserInfo, userBirth, username });
  }, [userBirth, username]);

  return {
    models: { username, isNameFill, radioData, userInfo },
    operations: { setUsername, setUserBirth, handleSignup },
  };
}

export default useStep4;
