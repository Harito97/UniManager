import { Button, Result } from "antd";
import React, { useEffect, useState } from "react";

const NotFound = () => {
  const path = window.location.pathname;
  const [text, setText] = useState(
    "Sorry, the page you visited does not exist.",
  );
  const [code, setCode] = useState("404");

  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (
      path === "/student" ||
      path === "/student/dashboard" ||
      path === "/student/calendar" ||
      path === "/teacher" ||
      path === "/admin"
    ) {
      setText("Sorry, you are not authorized to access this page.");
      setCode("403");
    } else {
      setText("Sorry, the page you visited does not exist.");
      setCode("404");
    }
  }, [path]);

  useEffect(() => {
    setTimeout(() => {
      window.location.replace("/");
    }, 3000);
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Result
        status={code}
        title={code}
        subTitle={text}
        extra={
          <>
            <div className="text-center text-base font-semibold">
              Redirecting in {timeLeft}
            </div>
            <a href="/login" className="">
              <Button className="mt-4 bg-blue-500" type="primary">
                Back to Login
              </Button>
            </a>
          </>
        }
      />
    </div>
  );
};

export default NotFound;
