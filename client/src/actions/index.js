export const keyWord = "Key_Word";
export const handleKeyword = (input) => {
  return {
    type: keyWord,
    paylaod: input,
  };
};

export const searchOn = "Search_On";
export const handleIsSearchOn = (input) => {
  return {
    type: searchOn,
    paylaod: input,
  };
};

export const handleLoginCase = "Login_Case";
export const handleIsLogin = (input) => {
  return {
    type: handleLoginCase,
    paylaod: input,
  };
};

export const loadingCase = "Loading_Case";
export const handleLoadingOn = (input) => {
  return {
    type: loadingCase,
    paylaod: input,
  };
};

export const userInfoCase = "User_Info_Case";
export const handleUserInfo = (input) => {
  return {
    type: userInfoCase,
    paylaod: input,
  };
};

export const newMessageCase = "New_Message_Case";
export const handleNewMessage = (input) => {
  return {
    type: newMessageCase,
    paylaod: input,
  };
};
