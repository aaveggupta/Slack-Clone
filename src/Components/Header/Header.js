import React, { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";

import "./Header.css";
import useDataLayer from "../../Helpers/StateProvider";
import { auth } from "../../Firebase/firebase-config";

const Header = () => {
  const [{ user }, dispatch] = useDataLayer();

  const logout = async () => {
    await auth.signOut();
  };

  return (
    <div className="header">
      <div className="header__left">
        <Avatar
          alt={user?.displayName}
          className="header__left-avt"
          sx={{ width: 31, height: 31 }}
          src={user?.photoURL}
        />
        <div className="header__left-end">
          <div className="header__left-arrow">
            <BsArrowLeft className="header__left-arrow-l" />
            <BsArrowRight className="header__left-arrow-r" />
          </div>
          <BiTimeFive className="header__left-time" />
        </div>
      </div>
      <div className="header__center">
        <input
          type="text"
          placeholder="&#xF002; Search Aaveg's Headquarter"
          className="header__center-search"
        />
      </div>
      <div className="header__right">
        <AiOutlineLogout onClick={logout} className="header__right-logo" />
      </div>
    </div>
  );
};

export default Header;
