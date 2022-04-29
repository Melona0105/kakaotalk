import { useDispatch, useSelector } from "react-redux";
import {
  handleBirthdayFriend,
  handleIsSearchOn,
  handleKeyword,
} from "../../actions";
import sample from "../../images/seemore/kakao talk.svg";
import client from "../../Socket";
import {
  filterDataByKeyWord,
  getCurrentTime,
  sortDataToAlphabeticalOrder,
} from "../../utils";

function useFriendPageContainer(userFriends) {
  const { isSearchOn } = useSelector((state) => state.SearchOnReducer);
  const { keyWord } = useSelector((state) => state.SearchKeyWordReducer);
  const { isBirthDayFriendOn } = useSelector(
    (state) => state.BirthFriendReducer
  );
  const dispatch = useDispatch();

  client.on("birth", () => {
    dispatch(handleBirthdayFriend(!isBirthDayFriendOn));
  });
  let friendDataFromServer;
  if (!userFriends || userFriends.length === 0) {
    friendDataFromServer = [
      {
        photo: sample,
        username: "카카오톡",
        comment: "친구를 추가해보세요",
        option: true,
      },
    ];
  } else {
    friendDataFromServer = userFriends.filter((el) =>
      filterDataByKeyWord(el.username, keyWord)
    );
  }

  const toDayDate = getCurrentTime("birth");

  function getBirthFriend(data) {
    const result = data.filter(
      (el) => el.userBirth && el.userBirth.slice(5) === toDayDate
    );
    return result;
  }

  const birthFriend = getBirthFriend(friendDataFromServer);
  sortDataToAlphabeticalOrder(friendDataFromServer);

  function searchOnChange(e) {
    dispatch(handleKeyword(e.target.value));
  }

  function searchOnKeyDown(e) {
    if (e.key === "Escape") {
      dispatch(handleKeyword(""));
      dispatch(handleIsSearchOn(!isSearchOn));
    }
  }
  return {
    models: {
      isSearchOn,
      keyWord,
      isBirthDayFriendOn,
      birthFriend,
      friendDataFromServer,
    },
    operations: { searchOnChange, searchOnKeyDown },
  };
}
export default useFriendPageContainer;
