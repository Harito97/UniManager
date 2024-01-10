import React from "react";
import ChangePwdForm from "../Home/ChangePwdForm";

const UserProfile = ({ user }) => {
  return (
    <>
      <ChangePwdForm user={user} />
    </>
  );
};

export default UserProfile;
