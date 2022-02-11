// * 친구목록
// 검색어저장
export const keyWord = "KEY_WORD";
export const handleKeyword = (input) => {
  return {
    type: keyWord,
    paylaod: input,
  };
};

// 검색상태유지
export const searchOn = "SEACH_ON";
export const handleIsSearchOn = (input) => {
  return {
    type: searchOn,
    paylaod: input,
  };
};

// * 채팅방
// 검색어저장
export const roomKeyWord = "ROOM_KEY_WORD";
export const handleRoomKeyword = (input) => {
  return {
    type: roomKeyWord,
    paylaod: input,
  };
};

// 검색상태유지
export const roomSearchOn = "ROOM_SEARCH_ON";
export const handleIsRoomSearchOn = (input) => {
  return {
    type: roomSearchOn,
    paylaod: input,
  };
};

// 로그인유지
export const handleLoginCase = "LOGIN";
export const handleIsLogin = (input) => {
  return {
    type: handleLoginCase,
    paylaod: input,
  };
};

// 로딩
export const loadingCase = "LOADING";
export const handleLoadingOn = (input) => {
  return {
    type: loadingCase,
    paylaod: input,
  };
};

// 유저정보 유지
export const userInfoCase = "USER_INFO";
export const handleUserInfo = (input) => {
  return {
    type: userInfoCase,
    paylaod: input,
  };
};

// 현재페이지 저장
export const currentPageCase = "CURRENT_PAGE";
export const handleCurrentPage = (input) => {
  return {
    type: currentPageCase,
    paylaod: input,
  };
};

// 메세지 확인
export const isMsgChangeCase = "MSG_CHANGE";
export const handleIsMsgChange = (input) => {
  return {
    type: isMsgChangeCase,
    paylaod: input,
  };
};

// 렌더링을 주기위한 리듀서..
export const userFriendsInfo = "FRIENDS_INFO";
export const handleUserFriends = (input) => {
  return {
    type: userFriendsInfo,
    paylaod: input,
  };
};

export const birthDayOption = "BIRTHDAY_OPTION";
export const handleBirthdayFriend = (input) => {
  return {
    type: birthDayOption,
    paylaod: input,
  };
};
