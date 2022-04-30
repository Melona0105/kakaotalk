import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLoadingOn } from "../../../../../actions";
import Service from "../../../../../services";
import client from "../../../../../Socket";

function useProfileSetting() {
  const dispatch = useDispatch();
  const [isEditOn, setIsEditOn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [editValue, setEditValue] = useState("");
  const { isLoadingOn } = useSelector((state) => state.LoadingReducer);

  useEffect(() => {
    client.on("friends", () => {
      getUserInfo();
    });

    return () => {
      client.off("friends");
    };
  }, []);

  // useEffect(() => {
  //   return () => {
  //     client.close();
  //   };
  // }, []);

  async function getUserInfo() {
    dispatch(handleLoadingOn(true));
    try {
      const data = await Service.users.fetchUserInfo();
      setUserInfo(data);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(handleLoadingOn(false));
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return {
    models: { isLoadingOn, userInfo, isEditOn, editValue },
    operations: { setIsEditOn, setEditValue },
  };
}

export default useProfileSetting;
