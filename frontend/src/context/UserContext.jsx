import { notification } from "antd";
import { createContext, useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const ContentContext = createContext(undefined);

export const ContentProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(null);
  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [api, contextHolder] = notification.useNotification();
  const placement = "topRight";

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await axios
        .get("http://localhost:8000/users/me/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.token,
          },
        })
        .then((res) => {
          setUser(res.data.username);
          setLevel(res.data.access_level);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    };
    fetchUser();
  }, [cookies.token]);

  const getToken = () => {
    return cookies.token
  }

  const handleLogin = (token) => {
    setCookie("token", token, { path: "/" });
  };

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
  };

  const openSuccessNotification = (title, description) => {
    api.success({
      message: title,
      description: description,
      placement,
    });
  };
  const openErrorNotification = (title, description) => {
    api.error({
      message: title,
      description: description,
      placement,
    });
  };
  const openWarningNotification = (title, description) => {
    api.warning({
      message: title,
      description: description,
      placement,
    });
  };

  return (
    <ContentContext.Provider
      value={{
        openSuccessNotification,
        openErrorNotification,
        openWarningNotification,
        user,
        level,
        loading,
        getToken,
        handleLogin,
        handleLogout,
      }}
    >
      {contextHolder}
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () => useContext(ContentContext);
