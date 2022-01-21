// 검색어저장
export const keyWord = "Key_Word";
export const handleKeyword = (input) => {
  return {
    type: keyWord,
    paylaod: input,
  };
};

// 검색상태유지
export const searchOn = "Search_On";
export const handleIsSearchOn = (input) => {
  return {
    type: searchOn,
    paylaod: input,
  };
};

// 로그인유지
export const handleLoginCase = "Login_Case";
export const handleIsLogin = (input) => {
  return {
    type: handleLoginCase,
    paylaod: input,
  };
};

// 로딩
export const loadingCase = "Loading_Case";
export const handleLoadingOn = (input) => {
  return {
    type: loadingCase,
    paylaod: input,
  };
};

// 유저정보 유지
export const userInfoCase = "User_Info_Case";
export const handleUserInfo = (input) => {
  return {
    type: userInfoCase,
    paylaod: input,
  };
};

// 현재페이지 저장
export const currentPageCase = "Current_Page";
export const handleCurrentPage = (input) => {
  return {
    type: currentPageCase,
    paylaod: input,
  };
};

// 메세지 확인
export const isMsgChangeCase = "Msg_Change_Case";
export const handleIsMsgChange = (input) => {
  return {
    type: isMsgChangeCase,
    paylaod: input,
  };
};

// 렌더링을 주기위한 리듀서..
export const userFriendsInfo = "Friends_Info";
export const handleUserFriends = (input) => {
  return {
    type: userFriendsInfo,
    paylaod: input,
  };
};
