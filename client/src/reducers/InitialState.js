// ? 2 depth 이하는 리덕스 사용 최대한 지양하기

// 검색어저장
export const currentKeyword = { keyWord: "" };
// 검색상태유지
export const isSearchOn = { isSearchOn: false };
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
// 새 메시지 정보확인
export const newMsg = { room_id: undefined, newMsg: 0 };
// 현재페이지 저장
export const currentPage = { currentPage: 0 };
// 메세지 확인
export const isMsgChange = { isMsgChange: false };

// 렌더링을 주기위한 리듀서 -> 이거 다른방법 있는지 찾아보자 -> 비효율적일듯함
export const isRendering = { isRendering: false };
