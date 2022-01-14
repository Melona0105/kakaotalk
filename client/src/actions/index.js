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

export const handleLogin = "Handle_Login";
export const handleIsLogin = (input) => {
  return {
    type: handleLogin,
    paylaod: input,
  };
};
