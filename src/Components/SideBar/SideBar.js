import React, { useEffect, useState } from "react";
import "./SideBar.css";

import { BsFillCircleFill, BsPeople, BsPlus } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { BiMessageAltDetail, BiBookmark } from "react-icons/bi";
import { FiHash } from "react-icons/fi";
import { GoMention } from "react-icons/go";
import { CgPlayListSearch } from "react-icons/cg";
import { AiOutlineAppstore, AiOutlineFile } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import SideBarOption from "../SideBarOption/SideBarOption";

import db from "../../Firebase/firebase-config";
import useDataLayer from "../../Helpers/StateProvider";

const SideBar = () => {
  const [channels, setChannels] = useState([]);
  const [{ user }, dispatch] = useDataLayer();

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__profile-left">
          <h3 className="sidebar__profile-left__title">Aaveg's Headquarter</h3>
          <div className="sidebar__profile-left-down">
            <BsFillCircleFill className="sidebar__profile-left-down__icon" />
            <h5 className="sidebar__profile-left-down__subtitle">
              {user?.displayName}
            </h5>
          </div>
        </div>
        <div className="sidebar__profile-right">
          <FaRegEdit className="sidebar__profile-right__icon" />
        </div>
      </div>

      <div className="sidebar__option-up">
        <SideBarOption Icon={BiMessageAltDetail} text="Threads" />
        <SideBarOption Icon={GoMention} text="Mention & Reactions" />
        <SideBarOption Icon={BiBookmark} text="Saved Items" />
        <SideBarOption Icon={CgPlayListSearch} text="Channel Browser" />
        <SideBarOption Icon={BsPeople} text="People & User Groups" />
        <SideBarOption Icon={AiOutlineAppstore} text="Apps" />
        <SideBarOption Icon={AiOutlineFile} text="File Browser" />
        <SideBarOption Icon={MdKeyboardArrowUp} text="Show Less" />
      </div>
      <hr />
      <SideBarOption Icon={MdKeyboardArrowDown} text="Channels" />
      <hr />
      <SideBarOption Icon={BsPlus} addChannelOption text="Add Channel" />

      <div className="sidebar__channels">
        {channels.map((channel) => (
          <SideBarOption
            key={channel.id}
            id={channel.id}
            Icon={FiHash}
            text={channel.name}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
