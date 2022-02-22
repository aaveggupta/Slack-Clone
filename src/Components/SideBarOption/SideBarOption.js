import React from "react";
import "./SideBarOption.css";

import { useNavigate } from "react-router-dom";

import db from "../../Firebase/firebase-config";

const SideBarOption = ({ Icon, text, id, addChannelOption }) => {
  const navigate = useNavigate();

  const selectChannel = () => {
    id && navigate(`/channel/${id}`);
  };

  const addChannel = () => {
    const channelName = prompt("Enter the name of channel you wanna create!");
    if (channelName.trim().length) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };

  return (
    <div
      className="sidebaroption"
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      <Icon className="sidebaroption__icon" />
      <h6 className="sidebaroption__text">{text}</h6>
    </div>
  );
};

export default SideBarOption;
