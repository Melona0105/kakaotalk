import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  handleCurrentPage,
  handleIsLogin,
  handleUserInfo,
} from "../../../../actions";

function useSetting(setIsSettingOn) {
  const [isDetailOn, setIsDetailOn] = useState(false);
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState({ top: 0, left: 0 });

  function logoutHandler() {
    dispatch(handleUserInfo(undefined));
    localStorage.removeItem("token");
    dispatch(handleIsLogin(false));
    dispatch(handleCurrentPage(0));
  }

  const roomStyle = `top=${currentLocation.top - 450}, left=${
    currentLocation.left + 300
  }, width=600, height=450`;

  function settingPopupCallback(input) {
    setIsDetailOn(input);
    setIsSettingOn(input);
  }

  return {
    models: { isDetailOn, roomStyle },
    operations: {
      setIsDetailOn,
      setCurrentLocation,
      settingPopupCallback,
      logoutHandler,
    },
  };
}

export default useSetting;
