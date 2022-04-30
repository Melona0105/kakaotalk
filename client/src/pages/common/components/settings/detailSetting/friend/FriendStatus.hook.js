import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleLoadingOn } from "../../../../../../actions";
import Service from "../../../../../../services";
import client from "../../../../../../Socket";
import { filterDataByKeyWord } from "../../../../../../utils";

function useFriendStatus() {
  const dispatch = useDispatch();
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [friendStatusData, setFriendStatusData] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const friendData = currentKeyword === "" ? friendStatusData : sortedData;

  function searchOnChange(e) {
    setCurrentKeyword(e.target.value);
  }

  function searchOnKeyDown(e) {
    if (e.key === "Escape") {
      setCurrentKeyword("");
    }
  }

  useEffect(() => {
    client.on("friends", () => {
      console.log(11);
      getFriends();
    });

    return () => {
      client.off("friends");
    };
  }, []);

  // 친구목록 불러봐서 뿌려준다.
  async function getFriends() {
    dispatch(handleLoadingOn(true));
    try {
      const result = await Service.users.fetchFriends();
      if (result) {
        setFriendStatusData(result.filter((el) => el.status === currentStatus));
      } else {
        setFriendStatusData([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  useEffect(() => {
    getFriends();
  }, [currentStatus]);

  useEffect(() => {
    let nextState = [...friendStatusData];
    nextState = nextState.filter((el) =>
      filterDataByKeyWord(el.username, currentKeyword)
    );
    setSortedData(nextState);
  }, [currentKeyword]);

  function handleMenuStyle(input) {
    return currentStatus === input
      ? {
          color: "#000",
          borderBottom: "1px solid #000",
          fontWeight: "600",
        }
      : null;
  }
  return {
    models: { currentKeyword, friendData, currentStatus },
    operations: {
      handleMenuStyle,
      setCurrentStatus,
      setCurrentKeyword,
      searchOnChange,
      searchOnKeyDown,
    },
  };
}

export default useFriendStatus;
