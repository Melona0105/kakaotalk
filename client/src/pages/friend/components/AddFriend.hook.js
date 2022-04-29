import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleLoadingOn } from "../../../actions";
import Service from "../../../services";
import client from "../../../Socket";

function useAddFriend() {
  const dispatch = useDispatch();
  const [isInputFill, setIsInputFill] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isErrorOn, setIsErrorOn] = useState(false);
  const [friendInfo, setFriendInfo] = useState(undefined);
  const [isFriend, setIsFriend] = useState(false);
  const [isComplete, setIscomplete] = useState(false);

  useEffect(() => {
    inputEmail ? setIsInputFill(true) : setIsInputFill(false);
  }, [inputEmail]);

  // 엔터를 누르면 서버에서 친구인지 아닌지를 확인한다.
  async function findFriendFromServer() {
    setIsErrorOn(false);
    setIscomplete(false);
    setIsFriend(false);
    dispatch(handleLoadingOn(true));
    try {
      await Service.friends.getFindedFriend(
        inputEmail,
        setIsFriend,
        setFriendInfo
      );
      setIsEmailExist(true);
    } catch {
      setIsEmailExist(false);
      setIsErrorOn(true);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  async function AddFriendToServer() {
    dispatch(handleLoadingOn(true));
    try {
      // 친구목록에 추가
      await Service.friends.updateFriendInfo(friendInfo, setIscomplete);
      client.emit("friends", "data");
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  return {
    models: {
      inputEmail,
      isInputFill,
      isErrorOn,
      isFriend,
      isEmailExist,
      friendInfo,
      isComplete,
    },
    operations: { setInputEmail, findFriendFromServer, AddFriendToServer },
  };
}

export default useAddFriend;
