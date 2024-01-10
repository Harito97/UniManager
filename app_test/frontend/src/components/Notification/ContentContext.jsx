import { notification } from "antd";
import { createContext, useContext } from "react";

const ContentContext = createContext(undefined);

export const ContentProvider = ({ children }) => {
  const url = "";

  const [api, contextHolder] = notification.useNotification();
  const placement = "topRight";

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
        url,
        openSuccessNotification,
        openErrorNotification,
        openWarningNotification,
      }}
    >
      {contextHolder}
      {children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () => useContext(ContentContext);
