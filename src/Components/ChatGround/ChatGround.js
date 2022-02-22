import React, { useEffect, useState } from "react";
import "./ChatGround.css";

import { useParams } from "react-router-dom";

import { AiOutlineStar } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { FiHash } from "react-icons/fi";

import db from "../../Firebase/firebase-config";
import MessageCard from "../MessageCard/MessageCard";
import useDataLayer from "../../Helpers/StateProvider";

import firebase from "firebase/compat/app";

const ChatGround = () => {
  const { channelID } = useParams();
  const [channelName, setChannelName] = useState();
  const [channelMessages, setChannelMessages] = useState([]);

  const [message, setMessage] = useState("");
  const [{ user }, dispatch] = useDataLayer();

  useEffect(() => {
    db.collection("rooms")
      .doc(channelID)
      .onSnapshot((snapshot) => setChannelName(snapshot.data()));

    db.collection("rooms")
      .doc(channelID)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setChannelMessages(
          snapshot.docs.map((doc) => ({
            id: doc?.id,
            message: doc.data()?.message,
            timestamp: doc.data()?.timestamp,
            userImage: doc.data()?.userImage,
            username: doc.data()?.username,
          }))
        )
      );
  }, [channelID]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!message.trim().length) {
      setMessage("");
      return;
    }
    setMessage("");
    db.collection("rooms").doc(channelID).collection("messages").add({
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userImage: user?.photoURL,
      username: user?.displayName,
    });
  };

  console.log(channelMessages);

  return (
    <div className="chatground">
      <div className="chatground__header">
        <div>
          <FiHash style={{ fontSize: "1.2rem" }} />
          <h4 className="chatground__header-left__title">
            {channelName?.name}
          </h4>
          <AiOutlineStar style={{ fontSize: "1.3rem" }} />
        </div>
        <div>
          <BsInfoCircle style={{ fontSize: "1.2rem" }} />
          <h4 className="chatground__header-right__details">Details</h4>
        </div>
      </div>

      <div className="chatground__messages">
        {channelMessages.map((message) => (
          <MessageCard
            key={message?.id}
            username={message?.username}
            timestamp={message?.timestamp}
            userImage={message?.userImage}
            message={message?.message}
          />
        ))}
      </div>

      <form onSubmit={sendMessage} className="chatground__form">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder={`Message #${channelName?.name}`}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatGround;
