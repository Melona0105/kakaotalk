import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleIsLogin } from "./actions";

function useApp() {
  const { isLogin } = useSelector((state) => state.LoginReducer);
  const { isLoadingOn } = useSelector((state) => state.LoadingReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.token
      ? dispatch(handleIsLogin(true))
      : dispatch(handleIsLogin(false));
  }, [localStorage.token]);

  return { models: { isLoadingOn, isLogin } };
}
export default useApp;
