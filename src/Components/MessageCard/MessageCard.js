import React from "react";
import "./MessageCard.css";

const MessageCard = (props) => {
  console.log(props);
  return (
    <div className="messagecard">
      <img
        src={props.userImage}
        alt={props.username}
        className="messagecard__img"
      />
      <img
        src={props.userImage}
        alt="for_reference"
        className="messagecard__img1"
      />
      <div className="messagecard__right">
        <h6 className="messagecard__right-name">
          {props.username}{" "}
          {/* <span className="messagecard__right-time">
            {new Date(props.timestamp.seconds).toLocaleTimeString("en-US")}
          </span>{" "} */}
        </h6>
        <p className="messagecard__right-message">{props.message}</p>
      </div>
    </div>
  );
};

export default MessageCard;
