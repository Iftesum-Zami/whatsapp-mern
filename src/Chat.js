import React, { useContext, useState } from "react";
import "./Chat.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
import { UserContext } from "./App";

const Chat = ({ messages }) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const { name, email, photo } = loggedInUser;
  const [input, setInput] = useState("");

  const time = new Date();
  const newTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const sendMessage = async (e) => {
    e.preventDefault();
    axios.post("/messages/new", {
      message: input,
      name: name,
      timestamp: newTime,
      recieved: true,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="div chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last Seen at...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message, idx) => (
          <p
            key={message._id}
            className={`chat_message ${
              message.name === name && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
