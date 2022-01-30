// ? 2 depth 이하는 리덕스 사용 최대한 지양하기

// * 친구목록
// 검색어저장
export const currentKeyword = { keyWord: "" };
// 검색상태유지
export const isSearchOn = { isSearchOn: false };

// * 채팅방
// 검색어저장
export const currentRoomKeyword = { keyWord: "" };
// 검색상태유지
export const isRoomSearchOn = { isSearchOn: false };

// 로그인유지
export const currentIsLogin = { isLogin: false };
// 로딩
export const isLoadingOn = { isLoadingOn: false };
// 유저정보 유지
export const userInfo = {
  photo: undefined,
  username: undefined,
  email: undefined,
  birth: undefined,
  music: undefined,
  comment: undefined,
};
// 현재페이지 저장
export const currentPage = { currentPage: 0 };
// 메세지 확인
export const isMsgChange = { isMsgChange: false };

// 전역에 친구상태를 갖다 박아놓고 -> 필요한곳에서 땡겨다 쓴다
export const userFriends = { userFriends: [] };

export const isBirthDayFriendOn = { isBirthDayFriendOn: false };
